import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section id="home">
      <div>
        <h2>Willkommen zum Formel 1 Archiv</h2>
        <p>Entdecke Fahrer, Teams und Grand Prix Geschichte in einer modernen Archivansicht.</p>
        <p>Nutze die GP-Historie mit Saisonfilter, Streckenfilter und Suche nach Rennorten.</p>

        <div className="cards">
          <div className="card">
            <h3>Teams & Fahrer</h3>
            <p className="page-section">Aktuelle Fahrer und Teams.</p>
            <Link to="/teamsdrivers">Zu Teams & Fahrern →</Link>
          </div>

          <div className="card">
            <h3>Punkteübersicht</h3>
            <p className="page-section">Übersicht über Fahrer- und Teamswertung der einzelnen Saisons.</p>
            <Link to="/points">Zur Punkteübersicht →</Link>
          </div>

          <div className="card">
            <h3>Grand Prix Historie</h3>
            <p className="page-section">Übersicht zu allen Grands Prix.</p>
            <Link to="/gp">Zur GP-Historie →</Link>
          </div>

          <div className="card">
            <h3>Quiz</h3>
            <p className="page-section">Teste dein Formel‑1-Wissen mit Fragen zu Fahrern, Teams und Geschichte.</p>
            <Link to="/quiz">Zum Quiz →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
