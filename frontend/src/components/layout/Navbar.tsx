import { Link, useLocation } from 'react-router-dom';
import { useEcoStore } from '../../store/useEcoStore';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/coach', label: 'AI Coach' },
  { to: '/progress', label: 'Progress' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/lifecycle', label: 'Lifecycle' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { isDemoMode, latestFootprint, activateDemoMode, resetDemoMode } = useEcoStore();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary-dark">
            <span className="text-2xl">🌱</span>
            <span>EcoTrack</span>
          </Link>

          {/* Nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {latestFootprint && NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.to
                    ? 'bg-primary-light text-primary-dark'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isDemoMode ? (
              <button
                onClick={resetDemoMode}
                className="badge-pill bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors cursor-pointer"
              >
                ⚡ Demo Mode — Exit
              </button>
            ) : (
              <button
                onClick={activateDemoMode}
                className="badge-pill bg-primary-light text-primary-dark hover:bg-green-200 transition-colors cursor-pointer"
              >
                ⚡ Try Demo
              </button>
            )}
            {!latestFootprint ? (
              <Link to="/audit" className="btn-primary text-sm py-2 px-4">
                Start Audit →
              </Link>
            ) : (
              <Link to="/audit" className="btn-secondary text-sm py-2 px-4">
                New Audit
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {latestFootprint && (
        <div className="md:hidden border-t border-gray-100 px-4 py-2 flex gap-1 overflow-x-auto scrollbar-none">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === link.to
                  ? 'bg-primary-light text-primary-dark'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
