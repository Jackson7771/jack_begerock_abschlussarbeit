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
      <h2>Drivers</h2>
      {loading && <p>Loading drivers...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {drivers.map((d) => (
            <li key={d.driverId}>
              {d.givenName} {d.familyName} — {d.nationality}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
