import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Trainings from './pages/Trainings';
import CourseDetail from './pages/CourseDetail';
import Jobs from './pages/Jobs';
import Consulting from './pages/Consulting';
import Pricing from './pages/Pricing';
import Register from './pages/Register';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Logo from './components/Logo';

export default function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/" className="logo-link" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>
          <div className="nav-group">
            <Link to="/">Home</Link>
            <Link to="/trainings">Trainings</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/consulting">Consulting</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/register" className="button" style={{ margin: 0 }}>Register</Link>
            <Link to="/login" className="button button-secondary" style={{ margin: 0 }}>Login</Link>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/trainings/:courseId" element={<CourseDetail />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <footer>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <Logo />
          <p>© 2026 Sunshine Aura AI — Training, Consultancy, Jobs & Learning</p>
        </div>
      </footer>
    </>
  );
}
