import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchConstructorDrivers, fetchConstructorById, fetchConstructorResults, fetchDriverCareerResults } from '../api/ergast'
import { translateNationality } from '../utils/nationalityMaps'
import { getTeamLocation } from '../utils/teamLocations'
import { formatDateDDMMYYYY } from '../utils/dateUtils'
import { getTeamImage, getDriverImage } from '../utils/imageMaps'

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

export default function Team() {
  const { id } = useParams()
  const [team, setTeam] = useState(null)
  const [drivers, setDrivers] = useState([])
  const [driverStats, setDriverStats] = useState({})
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    Promise.all([fetchConstructorById(id), fetchConstructorDrivers(id), fetchConstructorResults(id)])
      .then(async ([teamData, teamDrivers, constructorResults]) => {
        if (!mounted) return
        setTeam(teamData)
        setDrivers(teamDrivers)
        setResults(constructorResults)

        const stats = await Promise.all(
          teamDrivers
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
        if (mounted) setError(e.message)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [id])

  return (
    <section>
      <h2>Team-Detail</h2>
      {loading && <p>Loading team information...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && team && (
        <div className="card">
          <img
            className="team-logo"
            src={getTeamImage(team)}
            alt={`${team.name || team.constructorId} Logo`}
          />
          <div className="card-body">
            <h3>{team.name || team.constructorId}</h3>
            <p className="label-row"><span className="label">Nationalität:</span> {translateNationality(team.nationality)}</p>
            <p className="label-row"><span className="label">Standort:</span> {getTeamLocation(team.constructorId)}</p>
            {team.url ? (
              <p>
                <a href={team.url} target="_blank" rel="noreferrer">
                  Offizielle Teamseite
                </a>
              </p>
            ) : (
              <p>Keine externe URL verfügbar.</p>
            )}
          </div>
        </div>
      )}

      {!loading && !error && drivers.length > 0 && (
        <div className="page-section">
          <h3>Fahrer des Teams</h3>
          {drivers.filter((d) => d.permanentNumber).length > 0 && (
            <>
              <h4>Stammfahrer</h4>
              <ul className="grid-list">
                {drivers
                  .filter((d) => d.permanentNumber)
                  .sort((a, b) => Number(a.permanentNumber) - Number(b.permanentNumber))
                  .map((d) => (
                    <li key={d.driverId} className="card">
                      <img
                        className="profile-image"
                        src={getDriverImage(d)}
                        alt={`${d.givenName} ${d.familyName}`}
                        loading="lazy"
                      />
                      <div className="card-body">
                        <h4>{d.givenName} {d.familyName}</h4>
                        <p className="label-row"><span className="label">Alter:</span> {calculateAge(d.dateOfBirth)}</p>
                        <p className="label-row"><span className="label">Startnummer:</span> {d.permanentNumber}</p>
                        <p className="label-row"><span className="label">Nationalität:</span> {translateNationality(d.nationality)}</p>
                        <p className="label-row"><span className="label">Karriere Rennen:</span> {driverStats[d.driverId]?.races ?? '–'}</p>
                        <p className="label-row"><span className="label">Karriere Siege:</span> {driverStats[d.driverId]?.wins ?? '–'}</p>
                      </div>
                      <div className="card-footer">
                        {d.url ? (
                          <a href={d.url} target="_blank" rel="noreferrer">
                            Mehr Info
                          </a>
                        ) : (
                          <span></span>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="page-section">
          <h3>Letzte Konstrukteurs-Ergebnisse</h3>
          <ul className="grid-list">
            {results.slice(0, 6).map((race) => (
              <li key={`${race.season}-${race.round}`} className="card">
                <h4>{race.raceName}</h4>
                <p>Streckenname: {race.Circuit.circuitName}</p>
                <p>Datum: {formatDateDDMMYYYY(race.date)}</p>
                <p>
                  Bester Fahrer:{' '}
                  {race.Results?.[0]?.Driver
                    ? `${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}`
                    : 'nicht verfügbar'}
                </p>
                <p>Position: {race.Results?.[0]?.positionText || '–'}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !error && (
        <p>
          <Link to="/teams">← Zurück zu Teams</Link>
        </p>
      )}
    </section>
  )
}
