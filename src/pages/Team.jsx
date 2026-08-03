import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchConstructorDrivers } from '../api/ergast'

export default function Team() {
  const { id } = useParams()
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchConstructorDrivers(id)
      .then((d) => mounted && setDrivers(d))
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false))
    return () => (mounted = false)
  }, [id])

  return (
    <section>
      <h2>Team: {id}</h2>
      {loading && <p>Loading team drivers...</p>}
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
