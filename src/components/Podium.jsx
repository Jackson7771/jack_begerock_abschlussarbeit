export default function Podium({ results = [] }) {
  if (!results || results.length === 0) return null

  const formatName = (result) => {
    if (!result?.Driver) return '–'
    return `${result.Driver.givenName} ${result.Driver.familyName}`
  }

  const podiumPlaces = [
    { position: 2, index: 1, className: 'podium-second' },
    { position: 1, index: 0, className: 'podium-first' },
    { position: 3, index: 2, className: 'podium-third' },
  ]

  return (
    <div className="podium">
      {podiumPlaces.map(({ position, index, className }) => {
        const result = results[index]
        return (
          <div key={position} className={`podium-column ${className}`}>
            <span className="podium-place">{position}</span>
            <div className={`podium-block podium-block--${position}`}>
              <span className="podium-name">{formatName(result)}</span>
              <span className="podium-team">{result?.Constructor?.name || '–'}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
