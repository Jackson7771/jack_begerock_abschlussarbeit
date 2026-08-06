import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchConstructorById, fetchConstructorDrivers, fetchConstructors, fetchDriverCareerResults } from '../api/ergast'
import { translateNationality } from '../utils/nationalityMaps'
import { getTeamLocation } from '../utils/teamLocations'

function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return '–'
  const birth = new Date(dateOfBirth)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age -= 1
  }
  return age
}

export default function TeamsDrivers() {
  const [teams, setTeams] = useState([])
  const [selectedTeamId, setSelectedTeamId] = useState(null)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teamDrivers, setTeamDrivers] = useState([])
  const [driverStats, setDriverStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [error, setError] = useState(null)
  const [detailError, setDetailError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    fetchConstructors()
      .then((constructorData) => {
        if (!mounted) return
        setTeams(constructorData)
      })
      .catch((e) => {
        if (mounted) setError(e.message)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!selectedTeamId) {
      setSelectedTeam(null)
      setTeamDrivers([])
      setDetailError(null)
      return
    }

    let mounted = true
    setDetailLoading(true)
    setDetailError(null)

    Promise.all([fetchConstructorById(selectedTeamId), fetchConstructorDrivers(selectedTeamId)])
      .then(async ([teamData, driversData]) => {
        if (!mounted) return
        setSelectedTeam(teamData)
        setTeamDrivers(driversData)

        const stats = await Promise.all(
          driversData
            .filter((driver) => driver.permanentNumber)
            .map(async (driver) => {
              const careerResults = await fetchDriverCareerResults(driver.driverId)
              return {
                driverId: driver.driverId,
                races: careerResults.length,
                wins: careerResults.filter((race) => race.Results?.[0]?.position === '1').length,
              }
            })
        )

        if (!mounted) return
        const nextStats = {}
        stats.forEach((item) => {
          nextStats[item.driverId] = { races: item.races, wins: item.wins }
        })
        setDriverStats(nextStats)
      })
      .catch((e) => {
        if (mounted) setDetailError(e.message)
      })
      .finally(() => {
        if (mounted) setDetailLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [selectedTeamId])

  return (
    <section>
      <h2>Teams & Fahrer</h2>
      <p>Wähle zuerst ein Team aus der Übersicht, um mehr Details und seine Fahrer anzuzeigen.</p>
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading teams...</p>}

      {!loading && !error && (
        <>
          <div className="page-section">
            <h3>Teamübersicht</h3>
            <div className="grid-list">
              {teams.map((team) => (
                <article key={team.constructorId} className="card">
                  <div className="card-body">
                    <h4>{team.name || team.constructorId}</h4>
                    <p>Nationalität: {translateNationality(team.nationality)}</p>
                  </div>
                  <div className="card-footer">
                    <Link to={`/teams/${team.constructorId}`} className="button-link">Teamseite öffnen</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {selectedTeamId && (
            <div className="page-section">
              <h3>Teamdetails</h3>
              {detailError && <p>Error: {detailError}</p>}
              {detailLoading && <p>Loading team details...</p>}
              {!detailLoading && selectedTeam && (
                <div className="card">
                  <div className="card-body">
                    <h4>{selectedTeam.name || selectedTeam.constructorId}</h4>
                    <p className="label-row"><span className="label">Team-ID:</span> {selectedTeam.constructorId}</p>
                    <p className="label-row"><span className="label">Nationalität:</span> {translateNationality(selectedTeam.nationality)}</p>
                    <p className="label-row"><span className="label">Standort:</span> {getTeamLocation(selectedTeam.constructorId)}</p>
                    {selectedTeam.url ? (
                      <p>
                        <a href={selectedTeam.url} target="_blank" rel="noreferrer">
                          Offizielle Teamseite
                        </a>
                      </p>
                    ) : (
                      <p>Keine externe Teamseite verfügbar.</p>
                    )}
                  </div>
                  <div className="card-footer">
                    <Link to={`/teams/${selectedTeam.constructorId}`}>Zur Teamseite →</Link>
                  </div>
                </div>
              )}

              {!detailLoading && teamDrivers.length > 0 && (
                <div className="page-section">
                  <h4>Fahrer des Teams</h4>
                  {teamDrivers.filter((driver) => driver.permanentNumber).length > 0 && (
                    <>
                      <h5>Stammfahrer</h5>
                      <div className="grid-list">
                        {teamDrivers
                          .filter((driver) => driver.permanentNumber)
                          .sort((a, b) => Number(a.permanentNumber) - Number(b.permanentNumber))
                          .map((driver) => {
                            return (
                              <article key={driver.driverId} className="card">
                                <div className="card-body">
                                  <h5>{driver.givenName} {driver.familyName}</h5>
                                  <p className="label-row"><span className="label">Alter:</span> {calculateAge(driver.dateOfBirth)}</p>
                                  <p className="label-row"><span className="label">Startnummer:</span> {driver.permanentNumber}</p>
                                  <p className="label-row"><span className="label">Nationalität:</span> {translateNationality(driver.nationality)}</p>
                                  <p className="label-row"><span className="label">Karriere Rennen:</span> {driverStats[driver.driverId]?.races ?? '–'}</p>
                                  <p className="label-row"><span className="label">Karriere Siege:</span> {driverStats[driver.driverId]?.wins ?? '–'}</p>
                                </div>
                                <div className="card-footer">
                                  <Link to={`/drivers/${driver.driverId}`}>Fahrer-Details</Link>
                                </div>
                              </article>
                            )
                          })}
                      </div>
                    </>
                  )}

                </div>
              )}

              <button type="button" onClick={() => setSelectedTeamId(null)} style={{ marginTop: 16 }}>
                Zur Teamübersicht zurück
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
