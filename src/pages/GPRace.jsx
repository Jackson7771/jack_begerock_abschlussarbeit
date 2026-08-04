import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchRaceResults } from '../api/ergast'

export default function GPRace() {
  const { season, round } = useParams()
  const [race, setRace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchRaceResults(season, round)
      .then((data) => {
        if (!mounted) return
        setRace(data)
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
  }, [season, round])

  return (
    <section>
      <h2>Renn-Details</h2>
      {loading && <p>Loading race details...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && race && (
        <div className="card">
          <h3>{race.raceName}</h3>
          <p>Saison {race.season}, Runde {race.round}</p>
          <p>{race.date}</p>
          <p>{race.Circuit.circuitName}</p>
          <p>
            {race.Circuit.Location.locality}, {race.Circuit.Location.country}
          </p>
          <h4>Top 3 Ergebnisse</h4>
          <ul>
            {race.Results?.slice(0, 3).map((result) => (
              <li key={result.position}>
                {result.position}. {result.Driver.givenName} {result.Driver.familyName} — {result.Constructor.name} ({result.positionText})
              </li>
            ))}
          </ul>
          <p>
            <Link to="/gp">← Zurück zur Saisonübersicht</Link>
          </p>
        </div>
      )}
    </section>
  )
}
