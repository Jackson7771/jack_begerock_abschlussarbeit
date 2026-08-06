import driverPlaceholder from '../assets/driver-placeholder.svg'
import teamPlaceholder from '../assets/team-placeholder.svg'

const placeholderImage = driverPlaceholder

const driverImages = {
  norris: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Lando_Norris_2022.jpg',
  leclerc: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Charles_Leclerc_portrait_2020.png',
  'max_verstappen': 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Max_Verstappen_with_puppet.jpg',
  hamilton: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
  russell: 'https://upload.wikimedia.org/wikipedia/commons/7/77/2026_Chinese_GP_-_Mercedes_-_George_Russell_-_Qualifying.jpg',
  sainz: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Carlos_Sainz_Jr._2022.jpg',
  perez: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/2022_Miami_GP_-_Red_Bull_RB18_of_Sergio_Perez.jpg',
}

const teamImages = {
  ferrari: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Ferrari_F430_Scuderia_16M_logo.jpg',
  red_bull: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Red_Bull_Racing_-_2005_Logo.png',
  oracle_red_bull_racing: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Red_Bull_Racing_-_2005_Logo.png',
  mercedes: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Mercedes-Benz_Logo_2010.svg',
  aston_martin: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Aston_Martin_F1_Team_logo_2024.jpg',
  mclaren: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Arrow_McLaren_logo_(2023).png',
  alpine: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Alpine_F1_Team_logo.svg',
  williams: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Williams_Grand_Prix_Engineering_logo.svg',
  haas: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Haas_logo.svg',
  audi: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Audi_logo_2016.svg',
  cadillac: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Cadillac_logo.svg',
}

function normalizeKey(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, '_')
}

export function getDriverImage(driver) {
  if (!driver) return placeholderImage
  const keys = [driver.driverId, [driver.familyName, driver.givenName].join('_'), [driver.givenName, driver.familyName].join('_'), driver.familyName]
    .filter(Boolean)
    .map(normalizeKey)

  const imageKey = keys.find((key) => driverImages[key])
  return driverImages[imageKey] || placeholderImage
}

export function getTeamImage(team) {
  if (!team) return teamPlaceholder
  const keys = [team.constructorId, team.name, team.name?.replace(/\s+/g, '_')]
    .filter(Boolean)
    .map(normalizeKey)

  const imageKey = keys.find((key) => teamImages[key])
  return teamImages[imageKey] || teamPlaceholder
}
