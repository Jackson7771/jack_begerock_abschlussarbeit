import heroImg from '../assets/hero.png'

export default function Home() {
  return (
    <section id="home">
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="" />
      </div>
      <div>
        <h2>Willkommen zum Formel 1 Archiv</h2>
        <p>Eine kompakte Übersicht über Fahrer, Teams und Grand Prix Historie.</p>
      </div>
    </section>
  )
}
