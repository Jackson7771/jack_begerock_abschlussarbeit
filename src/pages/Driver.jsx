import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchDriverById, fetchDriverCareerResults, fetchDriverResults } from '../api/ergast'
import { translateNationality } from '../utils/nationalityMaps'
import { getDriverImage } from '../utils/imageMaps'

function calculateAge(dateOfBirth) {
  const birth = new Date(dateOfBirth)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age -= 1
  }
  return age
}

export default function Driver() {
  const { id } = useParams()
  const [driver, setDriver] = useState(null)
  const [careerStats, setCareerStats] = useState({ races: 0, wins: 0 })
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    Promise.all([fetchDriverById(id), fetchDriverCareerResults(id), fetchDriverResults(id)])
      .then(([driverData, careerResults, driverResults]) => {
        if (!mounted) return
        setDriver(driverData)
        setCareerStats({
          races: careerResults.length,
          wins: careerResults.filter((race) => race.Results?.[0]?.position === '1').length,
        })
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
          <img
            className="profile-image"
            src={getDriverImage(driver)}
            alt={`${driver.givenName} ${driver.familyName}`}
          />
          <h3>{driver.givenName} {driver.familyName}</h3>
          <p className="label-row"><span className="label">Alter:</span> {calculateAge(driver.dateOfBirth)}</p>
          {driver.permanentNumber && (
            <p className="label-row"><span className="label">Startnummer:</span> {driver.permanentNumber}</p>
          )}
          <p className="label-row"><span className="label">Nationalität:</span> {translateNationality(driver.nationality)}</p>
          <p className="label-row"><span className="label">Karriere Rennen:</span> {careerStats.races}</p>
          <p className="label-row"><span className="label">Karriere Siege:</span> {careerStats.wins}</p>
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
