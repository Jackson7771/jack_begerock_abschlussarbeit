import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchDrivers, fetchDriverCareerResults } from '../api/ergast'
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

export default function Drivers() {
  const [drivers, setDrivers] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchDrivers()
      .then((d) => {
        if (!mounted) return
        setDrivers(d)
        const mainDrivers = d
          .filter((driver) => driver.permanentNumber)
          .sort((a, b) => Number(a.permanentNumber) - Number(b.permanentNumber))
          .slice(0, 2)

        return Promise.all(
          mainDrivers.map((driver) =>
            fetchDriverCareerResults(driver.driverId).then((results) => ({ driverId: driver.driverId, results }))
          )
        )
      })
      .then((careerData) => {
        if (!mounted || !careerData) return
        const nextStats = {}
        careerData.forEach(({ driverId, results }) => {
          nextStats[driverId] = {
            races: results.length,
            wins: results.filter((race) => race.Results?.[0]?.position === '1').length,
          }
        })
        setStats(nextStats)
      })
      .catch((err) => {
        if (mounted) setError(err.message)
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  const mainDrivers = drivers
    .filter((driver) => driver.permanentNumber)
    .sort((a, b) => Number(a.permanentNumber) - Number(b.permanentNumber))
    .slice(0, 2)

  return (
    <section>
      <h2>Aktuelle Formel-1-Fahrer</h2>
      <p>Nur die zwei Stammfahrer mit Karriereübersicht.</p>

      {loading && <p>Loading drivers...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul className="grid-list">
          {mainDrivers.map((d) => (
            <li key={d.driverId} className="card">
              <img
                className="profile-image"
                src={getDriverImage(d)}
                alt={`${d.givenName} ${d.familyName}`}
                loading="lazy"
              />
              <div className="card-body">
                <h3>{d.givenName} {d.familyName}</h3>
                <p className="label-row"><span className="label">Alter:</span> {calculateAge(d.dateOfBirth)}</p>
                <p className="label-row"><span className="label">Startnummer:</span> {d.permanentNumber}</p>
                <p className="label-row"><span className="label">Nationalität:</span> {translateNationality(d.nationality)}</p>
                <p className="label-row"><span className="label">Karriere Rennen:</span> {stats[d.driverId]?.races ?? '–'}</p>
                <p className="label-row"><span className="label">Karriere Siege:</span> {stats[d.driverId]?.wins ?? '–'}</p>
              </div>
              <div className="card-footer">
                <Link to={`/drivers/${d.driverId}`} className="button-link">Fahrerprofil</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
