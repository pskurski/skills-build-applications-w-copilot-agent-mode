import './App.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const navClassName = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

  return (
    <div className="app-shell">
      <header className="app-header border-bottom">
        <div className="container py-3">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <h1 className="display-6 fw-semibold mb-1">OctoFit Tracker</h1>
              <p className="text-secondary mb-0">Fitness progress, teams, and competition in one dashboard.</p>
            </div>
            <a className="btn btn-outline-primary" href="https://getbootstrap.com/docs/5.3/getting-started/introduction/" target="_blank" rel="noreferrer">
              Bootstrap docs
            </a>
          </div>

          <nav className="navbar navbar-expand-lg rounded-3 mt-4 app-nav" aria-label="Main navigation">
            <div className="container-fluid px-2">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainNavbar"
                aria-controls="mainNavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse show" id="mainNavbar">
                <div className="navbar-nav gap-1 flex-wrap">
                  <NavLink to="/activities" className={navClassName}>Activities</NavLink>
                  <NavLink to="/leaderboard" className={navClassName}>Leaderboard</NavLink>
                  <NavLink to="/teams" className={navClassName}>Teams</NavLink>
                  <NavLink to="/users" className={navClassName}>Users</NavLink>
                  <NavLink to="/workouts" className={navClassName}>Workouts</NavLink>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="container py-4 py-lg-5">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
