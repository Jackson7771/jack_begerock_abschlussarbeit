import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchRaces, fetchSeasons } from '../api/ergast'

export default function GP() {
  const [seasons, setSeasons] = useState([])
  const [selectedSeason, setSelectedSeason] = useState('current')
  const [races, setRaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchSeasons(10)
      .then((s) => {
        if (mounted) {
          setSeasons(s)
          if (s.length > 0) setSelectedSeason(s[0].season)
        }
      })
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!selectedSeason) return
    let mounted = true
    setError(null)
    setLoading(true)
    fetchRaces(selectedSeason)
      .then((data) => {
        if (mounted) setRaces(data)
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
  }, [selectedSeason])

  return (
    <section>
      <h2>Grand Prix Historie</h2>
      <p>Wähle eine Saison, um den historischen Rennkalender und die Ergebnisse zu sehen.</p>
      {error && <p>Error: {error}</p>}
      <div className="page-section">
        <label htmlFor="season-select">Saison:</label>
        <select
          id="season-select"
          value={selectedSeason}
          onChange={(event) => setSelectedSeason(event.target.value)}
          className="select-field"
        >
          <option value="current">Aktuell</option>
          {seasons.map((season) => (
            <option key={season.season} value={season.season}>
              {season.season}
            </option>
          ))}
        </select>
      </div>
      {loading && <p>Loading races...</p>}
      {!loading && !error && races.length === 0 && <p>Keine Rennen für diese Saison gefunden.</p>}
      {!loading && !error && races.length > 0 && (
        <ul className="grid-list">
          {races.map((race) => (
            <li key={`${race.season}-${race.round}`} className="card">
              <h3>{race.raceName}</h3>
              <p>{race.Circuit.circuitName}</p>
              <p>
                {race.date} — {race.Circuit.Location.locality}, {race.Circuit.Location.country}
              </p>
              <p>Runde: {race.round}</p>
              <p>
                <Link to={`/gp/${race.season}/${race.round}`}>Renn-Details ansehen →</Link>
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
