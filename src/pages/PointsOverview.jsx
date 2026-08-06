import { useEffect, useState } from 'react'
import { fetchConstructorStandings, fetchDriverStandings, fetchSeasons } from '../api/ergast'

export default function PointsOverview() {
  const [season, setSeason] = useState('2026')
  const [seasons, setSeasons] = useState([])
  const [driverStandings, setDriverStandings] = useState([])
  const [constructorStandings, setConstructorStandings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchSeasons(100)
      .then((data) => {
        if (!mounted) return
        const years = data.map((item) => item.season).sort((a, b) => Number(b) - Number(a))
        setSeasons(years)
        if (!years.includes(season) && years.length > 0) {
          setSeason(years[0])
        }
      })
      .catch((e) => {
        if (mounted) setError(e.message)
      })
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!season) return
    let mounted = true
    setLoading(true)
    setError(null)

    Promise.all([fetchDriverStandings(season), fetchConstructorStandings(season)])
      .then(([drivers, constructors]) => {
        if (!mounted) return
        setDriverStandings(drivers)
        setConstructorStandings(constructors)
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
  }, [season])

  return (
    <section>
      <h2>Punkteübersicht</h2>
      <p>Wähle ein Jahr und zeige die Fahrer- und Teamwertung inklusive Punkte und Siege an.</p>

      <div className="page-section" style={{ maxWidth: 320 }}>
        <label htmlFor="season-select">Jahr auswählen:</label>
        <select
          id="season-select"
          value={season}
          onChange={(event) => setSeason(event.target.value)}
          className="select-field"
        >
          {seasons.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading standings...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <>
          <div className="page-section">
            <h3>Fahrerwertung {season}</h3>
            <div className="card">
              <table className="points-table">
                <thead>
                  <tr>
                    <th>Pos.</th>
                    <th>Fahrer</th>
                    <th>Team</th>
                    <th>Punkte</th>
                    <th>Siege</th>
                  </tr>
                </thead>
                <tbody>
                  {driverStandings.map((row) => (
                    <tr key={row.position}>
                      <td>{row.position}</td>
                      <td>{row.Driver.givenName} {row.Driver.familyName}</td>
                      <td>{row.Constructors?.[0]?.name || '–'}</td>
                      <td>{row.points}</td>
                      <td>{row.wins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="page-section">
            <h3>Teamwertung {season}</h3>
            <div className="card">
              <table className="points-table">
                <thead>
                  <tr>
                    <th>Pos.</th>
                    <th>Team</th>
                    <th>Punkte</th>
                    <th>Siege</th>
                  </tr>
                </thead>
                <tbody>
                  {constructorStandings.map((row) => (
                    <tr key={row.position}>
                      <td>{row.position}</td>
                      <td>{row.Constructor.name}</td>
                      <td>{row.points}</td>
                      <td>{row.wins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
