import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchConstructorDrivers, fetchConstructorById } from '../api/ergast'

export default function Team() {
  const { id } = useParams()
  const [team, setTeam] = useState(null)
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    Promise.all([fetchConstructorById(id), fetchConstructorDrivers(id)])
      .then(([teamData, teamDrivers]) => {
        if (!mounted) return
        setTeam(teamData)
        setDrivers(teamDrivers)
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
          <h3>{team.name || team.constructorId}</h3>
          <p>Team-ID: {team.constructorId}</p>
          <p>Nationale: {team.nationality}</p>
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
      )}

      {!loading && !error && (
        <div className="page-section">
          <h3>Aktuelle Fahrer</h3>
          <ul className="grid-list">
            {drivers.map((d) => (
              <li key={d.driverId} className="card">
                <h4>{d.givenName} {d.familyName}</h4>
                <p>{d.nationality}</p>
                {d.permanentNumber && <p>Nummer: {d.permanentNumber}</p>}
                {d.code && <p>Code: {d.code}</p>}
                {d.url && (
                  <a href={d.url} target="_blank" rel="noreferrer">
                    Mehr Info
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p>
            <Link to="/teams">← Zurück zu Teams</Link>
          </p>
        </div>
      )}
    </section>
  )
}
