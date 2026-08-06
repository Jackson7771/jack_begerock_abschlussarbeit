import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchConstructors } from '../api/ergast'
import { translateNationality } from '../utils/nationalityMaps'
import { getTeamLocation } from '../utils/teamLocations'
import { getTeamImage } from '../utils/imageMaps'

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
      <h2>Aktuelle Teams</h2>
      <p>Die Ergast-API liefert aktuelle Konstrukteursdaten der Saison.</p>

      {loading && <p>Loading teams...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul className="grid-list">
          {teams.map((c) => (
            <li key={c.constructorId} className="card">
              <img
                className="team-logo"
                src={getTeamImage(c)}
                alt={`${c.name || c.constructorId} Logo`}
                loading="lazy"
              />
              <h3>{c.name || c.constructorId}</h3>
              <p className="label-row"><span className="label">Nationalität:</span> {translateNationality(c.nationality)}</p>
              <p className="label-row"><span className="label">Standort:</span> {getTeamLocation(c.constructorId)}</p>
              <Link to={`/teams/${c.constructorId}`}>Team-Detail</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
