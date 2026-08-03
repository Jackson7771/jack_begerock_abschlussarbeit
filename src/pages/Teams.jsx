import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchConstructors } from '../api/ergast'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchConstructors()
      .then((t) => mounted && setTeams(t))
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false))
    return () => (mounted = false)
  }, [])

  return (
    <section>
      <h2>Current Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {teams.map((c) => (
            <li key={c.constructorId}>
              <Link to={`/teams/${c.constructorId}`}>{c.name || c.constructorId}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
