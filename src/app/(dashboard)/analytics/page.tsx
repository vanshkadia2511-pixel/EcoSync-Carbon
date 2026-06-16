'use client';

import { useAppStore } from '@/store/useAppStore';

// Mock aggregate platform stats
const PLATFORM_STATS = {
  totalUsers: 4821,
  totalKgSaved: 182430,
  activeThisWeek: 1293,
  avgScore: 68,
  topChallenges: [
    { title: 'Zero Food Waste Week', participants: 842, kgSaved: 10525 },
    { title: 'Bike to Work 5 Days', participants: 631, kgSaved: 8203 },
    { title: 'Meatless Monday Month', participants: 578, kgSaved: 9248 },
    { title: 'Switch to LED Lighting', participants: 470, kgSaved: 4700 },
  ],
  categoryBreakdown: [
    { category: 'Transport', percentage: 38, color: '#10b981' },
    { category: 'Food', percentage: 27, color: '#34d399' },
    { category: 'Energy', percentage: 22, color: '#6ee7b7' },
    { category: 'Shopping', percentage: 13, color: '#a7f3d0' },
  ],
};

export default function AnalyticsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fade-in-up">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Admin</span>
          <h1 className="text-4xl font-bold text-[var(--color-primary)]">Platform Analytics</h1>
        </div>
        <p className="text-[var(--color-on-surface-variant)] text-lg">Aggregate EcoTrack impact across all users.</p>
      </header>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: PLATFORM_STATS.totalUsers.toLocaleString(), icon: '👥' },
          { label: 'Kg CO₂ Saved', value: `${(PLATFORM_STATS.totalKgSaved / 1000).toFixed(1)}t`, icon: '🌿' },
          { label: 'Active This Week', value: PLATFORM_STATS.activeThisWeek.toLocaleString(), icon: '⚡' },
          { label: 'Avg Eco-Score', value: PLATFORM_STATS.avgScore, icon: '📊' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-[var(--color-surface-container)] flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
            <span className="text-4xl mb-3">{stat.icon}</span>
            <p className="text-3xl font-black text-[var(--color-on-surface)]">{stat.value}</p>
            <p className="text-xs text-[var(--color-outline)] font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top AI Challenges */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-surface-container)]">
          <h2 className="text-xl font-bold text-[var(--color-on-surface)] mb-6 flex items-center gap-2">
            <span>🏆</span> Top AI Challenges
          </h2>
          <div className="space-y-4">
            {PLATFORM_STATS.topChallenges.map((c, i) => (
              <div key={c.title} className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[var(--color-surface-container-low)] flex items-center justify-center font-bold text-sm text-[var(--color-primary)]">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[var(--color-on-surface)] truncate">{c.title}</p>
                  <p className="text-xs text-[var(--color-outline)]">{c.participants} participants · {c.kgSaved.toLocaleString()} kg saved</p>
                </div>
                <div className="text-right">
                  <div className="w-24 bg-[var(--color-surface-container-low)] rounded-full h-2 mt-1">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)]"
                      style={{ width: `${(c.participants / PLATFORM_STATS.topChallenges[0].participants) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-surface-container)]">
          <h2 className="text-xl font-bold text-[var(--color-on-surface)] mb-6 flex items-center gap-2">
            <span>📊</span> Emission Source Breakdown
          </h2>
          <div className="space-y-4">
            {PLATFORM_STATS.categoryBreakdown.map(item => (
              <div key={item.category}>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="text-[var(--color-on-surface)]">{item.category}</span>
                  <span className="text-[var(--color-primary)] font-bold">{item.percentage}%</span>
                </div>
                <div className="w-full bg-[var(--color-surface-container-low)] rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--color-surface-container)]">
            <p className="text-center text-sm text-[var(--color-outline)]">
              Platform-wide data from <strong className="text-[var(--color-on-surface)]">{PLATFORM_STATS.totalUsers.toLocaleString()}</strong> users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
