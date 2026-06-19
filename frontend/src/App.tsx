import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DemoModeBanner from './components/layout/DemoModeBanner';
import LandingPage from './pages/LandingPage';
import AuditPage from './pages/AuditPage';
import DashboardPage from './pages/DashboardPage';
import CoachPage from './pages/CoachPage';
import ProgressPage from './pages/ProgressPage';
import QuizPage from './pages/QuizPage';
import TimelinePage from './pages/TimelinePage';
import LifecycleExplorerPage from './pages/LifecycleExplorerPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
        <DemoModeBanner />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/coach" element={<CoachPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/lifecycle" element={<LifecycleExplorerPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
