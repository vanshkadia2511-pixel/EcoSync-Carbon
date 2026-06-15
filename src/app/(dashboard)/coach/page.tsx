'use client';

import { useAppStore } from '@/store/useAppStore';

export default function CoachPage() {
  const recommendations = useAppStore(state => state.recommendations);
  
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <header className="mb-8 flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary-container)] rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-emerald-900/20">
          🤖
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-2">AI Carbon Coach</h1>
          <p className="text-[var(--color-on-surface-variant)] text-lg">Personalized recommendations to reduce your footprint.</p>
        </div>
      </header>

      <div className="space-y-6">
        {recommendations.map(rec => (
          <div key={rec.id} className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-surface-container)] flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-[var(--color-surface-container-low)] px-3 py-1 text-xs font-bold rounded uppercase text-[var(--color-outline)] tracking-wider">
                  {rec.category}
                </span>
                <span className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider ${
                  rec.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  rec.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {rec.difficulty}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-[var(--color-on-surface)]">{rec.title}</h2>
              <p className="text-[var(--color-on-surface-variant)] leading-relaxed">
                {rec.description}
              </p>
              
              <div className="flex gap-4">
                <button className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-md shadow-emerald-900/10">
                  Accept Challenge
                </button>
                <button className="bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] px-6 py-3 rounded-xl font-semibold hover:bg-[var(--color-surface-container)] transition-colors">
                  Not for me
                </button>
              </div>
            </div>
            
            <div className="md:w-48 flex flex-row md:flex-col gap-4">
              <div className="flex-1 bg-[var(--color-surface-container-low)] p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-[var(--color-outline)] text-xs font-semibold uppercase mb-1">Save</span>
                <span className="text-2xl font-bold text-[var(--color-primary)]">{rec.estimatedSavingKg}</span>
                <span className="text-xs text-[var(--color-outline)]">kg CO₂</span>
              </div>
              <div className="flex-1 bg-[var(--color-surface-container-low)] p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-[var(--color-outline)] text-xs font-semibold uppercase mb-1">Save</span>
                <span className="text-2xl font-bold text-[var(--color-primary)]">${rec.moneySaving}</span>
                <span className="text-xs text-[var(--color-outline)]">this week</span>
              </div>
            </div>
          </div>
        ))}

        {recommendations.length === 0 && (
          <div className="text-center py-20 text-[var(--color-outline)]">
            <span className="text-4xl block mb-4">✨</span>
            <p className="text-xl">You're doing great! No new recommendations right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
