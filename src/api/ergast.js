const BASE = 'https://api.jolpi.ca/ergast'

export async function fetchDrivers(season = 'current') {
  const url = `${BASE}/${season}/drivers.json`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
  const data = await res.json()
  return data?.MRData?.DriverTable?.Drivers ?? []
}

export async function fetchSeasons(limit = 5) {
  const url = `${BASE}/seasons.json?limit=${limit}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
  const data = await res.json()
  return data?.MRData?.SeasonTable?.Seasons ?? []
}

export default { fetchDrivers, fetchSeasons }
