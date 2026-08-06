const nationalityTranslations = {
  american: 'Amerikanisch',
  australian: 'Australisch',
  austrian: 'Österreichisch',
  belgian: 'Belgisch',
  brazilian: 'Brasilianisch',
  british: 'Britisch',
  canadian: 'Kanadisch',
  czech: 'Tschechisch',
  danish: 'Dänisch',
  german: 'Deutsch',
  french: 'Französisch',
  finnish: 'Finnisch',
  hungarian: 'Ungarisch',
  italian: 'Italienisch',
  japanese: 'Japanisch',
  mexican: 'Mexikanisch',
  monégasque: 'Monegassisch',
  monegasque: 'Monegassisch',
  new_zealander: 'Neuseeländisch',
  polish: 'Polnisch',
  portuguese: 'Portugiesisch',
  romanian: 'Rumänisch',
  russian: 'Russisch',
  south_african: 'Südafrikanisch',
  spanish: 'Spanisch',
  swedish: 'Schwedisch',
  swiss: 'Schweizerisch',
  thai: 'Thailändisch',
  venezuelan: 'Venezolanisch',
  italian_swiss: 'Italienisch-Schweizerisch',
  british_spanish: 'Britisch/Spanisch',
}

function normalizeNationality(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

export function translateNationality(nationality) {
  if (!nationality) return '–'

  const parts = String(nationality)
    .split(/[,/&]+/)
    .map((part) => normalizeNationality(part))
    .filter(Boolean)

  if (parts.length === 0) return '–'
  if (parts.length === 1) return nationalityTranslations[parts[0]] || String(nationality)

  return parts
    .map((part) => nationalityTranslations[part] || part)
    .join(', ')
}
