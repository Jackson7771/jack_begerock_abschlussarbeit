import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

  const officialDrivers = drivers
    .filter((driver) => driver.permanentNumber)
    .sort((a, b) => Number(a.permanentNumber) - Number(b.permanentNumber))

  return (
    <section>
      <h2>Aktuelle Formel-1-Fahrer</h2>
      <p>Die Liste zeigt nur die 22 Stammfahrer der Saison, ohne Test- und Ersatzfahrer.</p>

      {loading && <p>Loading drivers...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul className="grid-list">
          {officialDrivers.map((d) => (
            <li key={d.driverId} className="card">
              <h3>{d.givenName} {d.familyName}</h3>
              <p>{d.nationality}</p>
              <p>Geboren: {d.dateOfBirth}</p>
              <p>Nummer: {d.permanentNumber}</p>
              {d.code && <p>Code: {d.code}</p>}
              <p>
                <Link to={`/drivers/${d.driverId}`}>Fahrerprofil</Link>
              </p>
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
