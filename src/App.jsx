import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Drivers from './pages/Drivers'
import Teams from './pages/Teams'
import Team from './pages/Team'
import GP from './pages/GP'
import Quiz from './pages/Quiz'

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Formel 1 Archiv</h1>
        <nav>
          <Link to="/">Home</Link>
          <span> · </span>
          <Link to="/drivers">Drivers</Link>
          <span> · </span>
          <Link to="/teams">Teams</Link>
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
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<Team />} />
          <Route path="/gp" element={<GP />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
