const BASE = 'https://api.jolpi.ca/ergast/f1'

function normalizeSeason(season) {
  return season === 'current' ? '2026' : season
}

async function safeFetch(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
  return res.json()
}

export async function fetchDrivers(season = 'current') {
  const url = `${BASE}/${normalizeSeason(season)}/drivers.json`
  const data = await safeFetch(url)
  return data?.MRData?.DriverTable?.Drivers ?? []
}

export async function fetchSeasons(limit = 100) {
  const url = `${BASE}/seasons.json?limit=${limit}`
  const data = await safeFetch(url)
  return data?.MRData?.SeasonTable?.Seasons ?? []
}

export async function fetchConstructors(season = 'current') {
  const url = `${BASE}/${normalizeSeason(season)}/constructors.json`
  const data = await safeFetch(url)
  return data?.MRData?.ConstructorTable?.Constructors ?? []
}

export async function fetchConstructorDrivers(constructorId, season = 'current') {
  const url = `${BASE}/${normalizeSeason(season)}/constructors/${constructorId}/drivers.json`
  const data = await safeFetch(url)
  return data?.MRData?.DriverTable?.Drivers ?? []
}

export async function fetchDriverById(driverId, season = 'current') {
  const drivers = await fetchDrivers(season)
  return drivers.find((driver) => driver.driverId === driverId)
}

export async function fetchDriverResults(driverId, season = 'current') {
  const url = `${BASE}/${normalizeSeason(season)}/drivers/${driverId}/results.json?limit=1000`
  const data = await safeFetch(url)
  return data?.MRData?.RaceTable?.Races ?? []
}

export async function fetchDriverCareerResults(driverId) {
  const url = `${BASE}/drivers/${driverId}/results.json?limit=1000`
  const data = await safeFetch(url)
  return data?.MRData?.RaceTable?.Races ?? []
}

export async function fetchDriverStandings(season = 'current') {
  const url = `${BASE}/${normalizeSeason(season)}/driverStandings.json?limit=1000`
  const data = await safeFetch(url)
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? []
}

export async function fetchConstructorStandings(season = 'current') {
  const url = `${BASE}/${normalizeSeason(season)}/constructorStandings.json?limit=1000`
  const data = await safeFetch(url)
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? []
}

export async function fetchConstructorById(constructorId, season = 'current') {
  const constructors = await fetchConstructors(season)
  return constructors.find((c) => c.constructorId === constructorId)
}

export async function fetchRaces(season = 'current') {
  const url =
    season === 'all'
      ? `${BASE}/races.json?limit=2000`
      : `${BASE}/${normalizeSeason(season)}/races.json?limit=1000`
  const data = await safeFetch(url)
  return data?.MRData?.RaceTable?.Races ?? []
}

export async function fetchRaceResults(season = 'current', round = '1') {
  const url = `${BASE}/${normalizeSeason(season)}/${round}/results.json?limit=1000`
  const data = await safeFetch(url)
  return data?.MRData?.RaceTable?.Races?.[0] ?? null
}

export async function fetchConstructorResults(constructorId, season = 'current') {
  const url = `${BASE}/${normalizeSeason(season)}/constructors/${constructorId}/results.json?limit=1000`
  const data = await safeFetch(url)
  return data?.MRData?.RaceTable?.Races ?? []
}

export default { fetchDrivers, fetchSeasons, fetchConstructors, fetchConstructorDrivers, fetchConstructorById, fetchRaces, fetchConstructorResults }
