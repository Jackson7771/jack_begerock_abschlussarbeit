const teamLocations = {
  alpine: 'Enstone, Großbritannien',
  aston_martin: 'Silverstone, Großbritannien',
  audi: 'Neuburg an der Donau, Deutschland',
  cadillac: 'Indianapolis, USA',
  ferrari: 'Maranello, Italien',
  haas: 'Kannapolis, USA',
  mclaren: 'Woking, Großbritannien',
  mercedes: 'Brackley, Großbritannien',
  rb: 'Milton Keynes, Großbritannien',
  red_bull: 'Milton Keynes, Großbritannien',
  williams: 'Grove, Großbritannien',
}

export function getTeamLocation(constructorId) {
  return teamLocations[constructorId] || '–'
}
