'use client';

import { useAppStore } from '@/store/useAppStore';

export default function ChallengesPage() {
  const challenges = useAppStore(state => state.challenges);
  
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-2">Challenges & Missions</h1>
        <p className="text-[var(--color-on-surface-variant)] text-lg">Join community challenges and earn bonus Seeds.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {challenges.map(chal => (
          <div key={chal.id} className="bg-white p-6 rounded-3xl shadow-sm border border-[var(--color-surface-container)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-xs font-bold rounded uppercase tracking-wider ${
                  chal.status === 'Active' ? 'bg-[var(--color-primary)] text-white' : 
                  chal.status === 'Completed' ? 'bg-[var(--color-secondary)] text-white' : 
                  'bg-[var(--color-surface-container-low)] text-[var(--color-outline)]'
                }`}>
                  {chal.status}
                </span>
                <span className="bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] text-xs px-3 py-1 rounded-full font-bold">
                  +{chal.rewardSeeds} Seeds
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-[var(--color-on-surface)] mb-2">{chal.title}</h2>
              <p className="text-sm text-[var(--color-outline)] mb-6">
                Estimated savings: <strong className="text-[var(--color-primary)]">{chal.estimatedSavingKg} kg CO₂</strong>
              </p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-[var(--color-on-surface-variant)]">Progress</span>
                <span className="text-[var(--color-primary)]">{chal.progress} / {chal.target}</span>
              </div>
              <div className="w-full bg-[var(--color-surface-container-low)] rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                    chal.status === 'Completed' ? 'bg-[var(--color-secondary)]' : 'bg-[var(--color-primary)]'
                  }`}
                  style={{ width: `${(chal.progress / chal.target) * 100}%` }}
                ></div>
              </div>
              
              {chal.status === 'Available' && (
                <button className="mt-6 w-full bg-[var(--color-surface-container-low)] text-[var(--color-on-surface)] font-semibold py-3 rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                  Join Challenge
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
