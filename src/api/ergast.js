const BASE = 'https://api.jolpi.ca/ergast'

async function safeFetch(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
  return res.json()
}

export async function fetchDrivers(season = 'current') {
  const url = `${BASE}/${season}/drivers.json`
  const data = await safeFetch(url)
  return data?.MRData?.DriverTable?.Drivers ?? []
}

export async function fetchSeasons(limit = 5) {
  const url = `${BASE}/seasons.json?limit=${limit}`
  const data = await safeFetch(url)
  return data?.MRData?.SeasonTable?.Seasons ?? []
}

export async function fetchConstructors(season = 'current') {
  const url = `${BASE}/${season}/constructors.json`
  const data = await safeFetch(url)
  return data?.MRData?.ConstructorTable?.Constructors ?? []
}

export async function fetchConstructorDrivers(constructorId) {
  const url = `${BASE}/constructors/${constructorId}/drivers.json`
  const data = await safeFetch(url)
  return data?.MRData?.DriverTable?.Drivers ?? []
}

export async function fetchRaces(season = 'current') {
  const url = `${BASE}/${season}/races.json?limit=1000`
  const data = await safeFetch(url)
  return data?.MRData?.RaceTable?.Races ?? []
}

export default { fetchDrivers, fetchSeasons, fetchConstructors, fetchConstructorDrivers, fetchRaces }
