import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchRaces, fetchSeasons } from '../api/ergast'
import { formatDateDDMMYYYY } from '../utils/dateUtils'
import Podium from '../components/Podium'

export default function GP() {
  const [seasons, setSeasons] = useState([])
  const [selectedSeason, setSelectedSeason] = useState('')
  const [selectedCircuit, setSelectedCircuit] = useState('')
  const [searchText, setSearchText] = useState('')
  const [races, setRaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchSeasons(100)
      .then((s) => {
        if (mounted) {
          const sortedSeasons = [...s].sort((a, b) => Number(b.season) - Number(a.season))
          setSeasons(sortedSeasons)
          setSelectedSeason('all')
        }
      })
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!selectedSeason) return
    let mounted = true
    setError(null)
    setLoading(true)
    fetchRaces(selectedSeason)
      .then((data) => {
        if (mounted) setRaces(data)
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
  }, [selectedSeason])

  const circuits = useMemo(() => {
    const names = races.map((race) => race.Circuit.circuitName)
    return Array.from(new Set(names)).sort()
  }, [races])

  const filteredRaces = useMemo(() => {
    return races.filter((race) => {
      const matchesCircuit = !selectedCircuit || race.Circuit.circuitName === selectedCircuit
      const matchesSearch =
        !searchText ||
        race.raceName.toLowerCase().includes(searchText.toLowerCase()) ||
        race.Circuit.circuitName.toLowerCase().includes(searchText.toLowerCase()) ||
        race.Circuit.Location.locality.toLowerCase().includes(searchText.toLowerCase()) ||
        race.Circuit.Location.country.toLowerCase().includes(searchText.toLowerCase())
      return matchesCircuit && matchesSearch
    })
  }, [races, selectedCircuit, searchText])

  return (
    <section>
      <h2>Grand Prix Historie</h2>
      <p>Filtere die Rennhistorie nach Jahr, Strecke oder Ort.</p>
      {error && <p>Error: {error}</p>}
      <div className="page-section" style={{ display: 'grid', gap: '14px' }}>
        <div>
          <label htmlFor="season-select">Saison:</label>
          <select
            id="season-select"
            value={selectedSeason}
            onChange={(event) => setSelectedSeason(event.target.value)}
            className="select-field"
          >
            <option value="all">Alle Jahre</option>
            {seasons.map((season) => (
              <option key={season.season} value={season.season}>
                {season.season}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="circuit-select">Strecke:</label>
          <select
            id="circuit-select"
            value={selectedCircuit}
            onChange={(event) => setSelectedCircuit(event.target.value)}
            className="select-field"
          >
            <option value="">Alle Strecken</option>
            {circuits.map((circuit) => (
              <option key={circuit} value={circuit}>
                {circuit}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search-input">Suche:</label>
          <input
            id="search-input"
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="select-field"
            placeholder="Grand Prix, Ort oder Land"
          />
        </div>
      </div>

      {loading && <p>Loading races...</p>}
      {!loading && !error && filteredRaces.length === 0 && (
        <p>Keine Rennen gefunden. Probiere andere Filter oder wähle eine Saison.</p>
      )}

      {!loading && !error && filteredRaces.length > 0 && (
        <>
          <p>
            Gefundene Rennen: {filteredRaces.length} von {races.length}{' '}
            {selectedSeason === 'all' ? 'in allen Jahren' : `in Saison ${selectedSeason}`}
          </p>
          <ul className="grid-list">
            {filteredRaces.map((race) => (
              <li key={`${race.season}-${race.round}`} className="card">
              <div className="card-body">
                <h3>{race.raceName}</h3>
                <p>Streckenname: {race.Circuit.circuitName}</p>
                <p>Datum: {formatDateDDMMYYYY(race.date)}</p>
                <p>Ort: {race.Circuit.Location.locality}, {race.Circuit.Location.country}</p>
                <p>Runde: {race.round}</p>
                <Podium results={race.Results?.slice(0, 3) || []} />
              </div>
              <div className="card-footer">
                <Link to={`/gp/${race.season}/${race.round}`} className="button-link">Renn-Details ansehen →</Link>
              </div>
            </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
