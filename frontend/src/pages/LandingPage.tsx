import { Link } from 'react-router-dom';
import { useEcoStore } from '../store/useEcoStore';

const BENEFITS = [
  { icon: '📏', title: 'Measure', desc: 'Estimate your monthly and yearly footprint in minutes.' },
  { icon: '🔍', title: 'Understand', desc: 'See which lifestyle category creates the most impact.' },
  { icon: '🚀', title: 'Improve', desc: 'Get practical AI-powered actions you can start this week.' },
];

export default function LandingPage() {
  const { activateDemoMode, latestFootprint } = useEcoStore();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-green-600 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 text-sm font-semibold">
                <span className="animate-pulse">🌱</span> AI Carbon Footprint Tracker
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                Track your footprint.
                <br />
                <span className="text-green-200">Reduce it with AI.</span>
              </h1>
              <p className="text-lg md:text-xl text-green-100 max-w-lg leading-relaxed">
                EcoTrack helps you calculate your carbon footprint, discover your biggest impact areas,
                and build sustainable habits through personalized AI recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/audit" className="inline-flex items-center justify-center gap-2 bg-white text-primary-dark font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-50 transition-all shadow-lg hover:shadow-xl active:scale-95">
                  🌍 Start Carbon Audit →
                </Link>
                <button
                  onClick={activateDemoMode}
                  className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/30 transition-all active:scale-95"
                >
                  ⚡ Try Demo Data
                </button>
              </div>
              <p className="text-green-200 text-sm">
                ✓ No sign-in required &nbsp; ✓ Works offline &nbsp; ✓ Privacy-first
              </p>
            </div>

            {/* Floating preview cards */}
            <div className="relative h-96 hidden lg:block">
              <div className="absolute top-0 right-12 animate-fade-in-up bg-white text-gray-900 rounded-2xl shadow-2xl p-5 w-56" style={{ animationDelay: '0.1s' }}>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Eco Score</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-primary">72</span>
                  <span className="text-gray-400 mb-1">/100</span>
                </div>
                <div className="mt-2 bg-gray-100 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[72%]" />
                </div>
                <p className="text-xs text-primary font-semibold mt-1">↑ Good start</p>
              </div>

              <div className="absolute top-32 right-56 animate-fade-in-up bg-white text-gray-900 rounded-2xl shadow-2xl p-5 w-52" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">🌿</div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold">Monthly CO₂</p>
                    <p className="text-xl font-black text-gray-900">403.4 kg</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-60 right-8 animate-fade-in-up bg-white text-gray-900 rounded-2xl shadow-2xl p-4 w-48" style={{ animationDelay: '0.25s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="text-xs text-gray-400">Active Challenge</p>
                    <p className="font-bold text-sm">Transport Week</p>
                    <div className="mt-1 bg-gray-100 rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full w-[80%]" />
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">4/5 days</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 right-40 animate-fade-in-up bg-white text-gray-900 rounded-2xl shadow-2xl p-4 w-44" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="text-xs text-gray-400">Top Opportunity</p>
                    <p className="font-bold text-sm text-amber-600">Electricity</p>
                    <p className="text-xs text-gray-400">147.6 kg this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            More than a carbon calculator
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            EcoTrack turns awareness into action — from your first number to your first habit.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENEFITS.map((b, i) => (
            <div key={b.title} className="card p-8 text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-5xl mb-4">{b.icon}</div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">{b.title}</h3>
              <p className="text-gray-500">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-black text-primary-dark mb-4">
            Ready to understand your impact?
          </h2>
          <p className="text-primary-dark/70 mb-8 text-lg">
            Complete a carbon audit in under 2 minutes. No account required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/audit" className="btn-primary text-lg py-4 px-10">
              Start Carbon Audit →
            </Link>
            {latestFootprint && (
              <Link to="/dashboard" className="btn-secondary text-lg py-4 px-10">
                View Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
