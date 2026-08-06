import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Drivers from './pages/Drivers'
import Driver from './pages/Driver'
import TeamsDrivers from './pages/TeamsDrivers'
import Teams from './pages/Teams'
import Team from './pages/Team'
import PointsOverview from './pages/PointsOverview'
import GP from './pages/GP'
import GPRace from './pages/GPRace'
import Quiz from './pages/Quiz'

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Formel 1 Archiv</h1>
        <nav>
          <Link to="/">Home</Link>
          <span> · </span>
          <Link to="/teamsdrivers">Teams & Fahrer</Link>
          <span> · </span>
          <Link to="/points">Punkteübersicht</Link>
          <span> · </span>
          <Link to="/gp">Grand Prix History</Link>
          <span> · </span>
          <Link to="/quiz">Quiz</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/drivers/:id" element={<Driver />} />
          <Route path="/teamsdrivers" element={<TeamsDrivers />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<Team />} />
          <Route path="/points" element={<PointsOverview />} />
          <Route path="/gp" element={<GP />} />
          <Route path="/gp/:season/:round" element={<GPRace />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
