import { useEffect, useState } from 'react'
import { fetchDrivers } from '../api/ergast'

export default function Drivers() {
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchDrivers()
      .then((d) => {
        if (mounted) setDrivers(d)
      })
      .catch((err) => {
        if (mounted) setError(err.message)
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  return (
    <section>
      <h2>Aktuelle Formel-1-Fahrer</h2>
      <p>Die Liste stammt aus der Ergast-API für die aktuelle Saison.</p>

      {loading && <p>Loading drivers...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul className="grid-list">
          {drivers.map((d) => (
            <li key={d.driverId} className="card">
              <h3>{d.givenName} {d.familyName}</h3>
              <p>{d.nationality}</p>
              <p>Geboren: {d.dateOfBirth}</p>
              {d.permanentNumber && <p>Nummer: {d.permanentNumber}</p>}
              {d.code && <p>Code: {d.code}</p>}
              {d.url && (
                <a href={d.url} target="_blank" rel="noreferrer">Mehr Info</a>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
