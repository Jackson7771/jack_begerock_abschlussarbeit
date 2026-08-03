import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Drivers from './pages/Drivers'

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Formel 1 Archiv</h1>
        <nav>
          <Link to="/">Home</Link>
          <span> · </span>
          <Link to="/drivers">Drivers</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
