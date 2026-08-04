import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchDriverById, fetchDriverResults } from '../api/ergast'

export default function Driver() {
  const { id } = useParams()
  const [driver, setDriver] = useState(null)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    Promise.all([fetchDriverById(id), fetchDriverResults(id)])
      .then(([driverData, driverResults]) => {
        if (!mounted) return
        setDriver(driverData)
        setResults(driverResults)
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
      <h2>Fahrerprofil</h2>
      {loading && <p>Loading driver details...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && driver && (
        <div className="card">
          <h3>{driver.givenName} {driver.familyName}</h3>
          <p>{driver.nationality}</p>
          <p>Geboren: {driver.dateOfBirth}</p>
          {driver.permanentNumber && <p>Nummer: {driver.permanentNumber}</p>}
          {driver.code && <p>Code: {driver.code}</p>}
          {driver.url && (
            <p>
              <a href={driver.url} target="_blank" rel="noreferrer">
                Mehr Info
              </a>
            </p>
          )}
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="page-section">
          <h3>Letzte Rennergebnisse</h3>
          <ul className="grid-list">
            {results.slice(0, 6).map((race) => (
              <li key={`${race.season}-${race.round}`} className="card">
                <h4>{race.raceName}</h4>
                <p>{race.date}</p>
                <p>{race.Circuit.circuitName}</p>
                <p>Pole-Position: {race.Results?.[0]?.grid || '–'}</p>
                <p>Finish: {race.Results?.[0]?.positionText || '–'}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !error && (
        <p>
          <Link to="/drivers">← Zurück zu den Fahrern</Link>
        </p>
      )}
    </section>
  )
}
