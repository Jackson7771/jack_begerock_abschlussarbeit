import { useEffect, useState } from 'react'
import { fetchSeasons } from '../api/ergast'

export default function GP() {
  const [seasons, setSeasons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchSeasons(10)
      .then((s) => mounted && setSeasons(s))
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false))
    return () => (mounted = false)
  }, [])

  return (
    <section>
      <h2>Grand Prix History (recent seasons)</h2>
      {loading && <p>Loading seasons...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {seasons.map((s) => (
            <li key={s.season}>{s.season}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
