import heroImg from '../assets/hero.png'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section id="home">
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="" />
      </div>
      <div>
        <h2>Willkommen zum Formel 1 Archiv</h2>
        <p>Eine kompakte Übersicht über Fahrer, Teams und Grand Prix Historie.</p>

        <div className="cards">
          <div className="card">
            <h3>Aktuelle Fahrer</h3>
            <p className="page-section">Liste der derzeit aktiven Fahrer.</p>
            <Link to="/drivers">Zu den Fahrern →</Link>
          </div>

          <div className="card">
            <h3>Teams & Konstrukteure</h3>
            <p className="page-section">Aktuelle Teams und deren Fahrer.</p>
            <Link to="/teams">Zu den Teams →</Link>
          </div>

          <div className="card">
            <h3>Grand Prix Historie</h3>
            <p className="page-section">Saisons und Rennkalender (historisch).</p>
            <Link to="/gp">Zur GP-Historie →</Link>
          </div>

          <div className="card">
            <h3>Quiz</h3>
            <p className="page-section">Kurzes Quiz zur Formel‑1‑Geschichte.</p>
            <Link to="/quiz">Zum Quiz →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
