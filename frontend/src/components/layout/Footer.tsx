import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-primary-dark font-bold">
            <span className="text-xl">🌱</span>
            <span>EcoTrack</span>
            <span className="text-gray-400 font-normal text-sm ml-2">— Personal Climate Companion</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/about" className="hover:text-primary transition-colors">Methodology</Link>
            <Link to="/about" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/quiz" className="hover:text-primary transition-colors">Climate Quiz</Link>
            <Link to="/timeline" className="hover:text-primary transition-colors">Timeline</Link>
          </nav>
          <p className="text-xs text-gray-400">
            © 2026 EcoTrack · Emission factors are simplified educational estimates
          </p>
        </div>
      </div>
    </footer>
  );
}
