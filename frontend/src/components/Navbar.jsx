import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-lg shadow-md group-hover:scale-105 transition-transform">
            💪
          </div>
          <span className="text-xl font-bold tracking-tight">
            Workout<span className="text-indigo-400">Tracker</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              <Link
                to="/workouts"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/workouts')
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                🏋️ Workouts
              </Link>
              <Link
                to="/tasks"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/tasks')
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                ✅ Tasks
              </Link>
              <Link
                to="/profile"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/profile')
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                👤 Profile
              </Link>
              <div className="ml-3 flex items-center gap-3 border-l border-white/20 pl-3">
                <span className="text-sm text-gray-400">Hi, <span className="text-indigo-300 font-semibold">{user.name?.split(' ')[0]}</span></span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-md">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded-lg hover:bg-white/10" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="w-5 h-0.5 bg-white mb-1"></div>
          <div className="w-5 h-0.5 bg-white mb-1"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2 border-t border-white/10 pt-3">
          {user ? (
            <>
              <Link to="/workouts" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10">🏋️ Workouts</Link>
              <Link to="/tasks" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10">✅ Tasks</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10">👤 Profile</Link>
              <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-sm text-left text-red-400 hover:bg-red-500/20">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-lg text-sm bg-indigo-600 text-white text-center">Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
