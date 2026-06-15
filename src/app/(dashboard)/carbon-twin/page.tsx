'use client';

import { useAppStore } from '@/store/useAppStore';

export default function MyCarbonTwinPage() {
  const user = useAppStore(state => state.user);
  
  if (!user) return null;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fade-in-up">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-2">My Carbon Twin</h1>
        <p className="text-[var(--color-on-surface-variant)] text-lg">See the difference small changes can make.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
        {/* Current Me */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-surface-container)] flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute top-0 w-full h-2 bg-[var(--color-outline-variant)]"></div>
          <h2 className="text-2xl font-bold text-[var(--color-on-surface-variant)] mb-6 mt-4">Current Me</h2>
          
          <div className="w-32 h-32 bg-[var(--color-surface-container-low)] rounded-full flex items-center justify-center text-6xl mb-6 grayscale opacity-80 group-hover:grayscale-0 transition-all duration-500">
            🧍
          </div>
          
          <div className="w-full space-y-4">
            <div className="bg-[var(--color-surface-container-low)] p-4 rounded-xl flex justify-between items-center">
              <span className="text-[var(--color-on-surface-variant)] font-medium">Eco-Score</span>
              <span className="text-xl font-bold text-[var(--color-outline)]">{user.ecoScore}</span>
            </div>
            <div className="bg-[var(--color-surface-container-low)] p-4 rounded-xl flex justify-between items-center">
              <span className="text-[var(--color-on-surface-variant)] font-medium">Weekly Emissions</span>
              <span className="text-xl font-bold text-[var(--color-outline)]">45 kg</span>
            </div>
            <div className="bg-[var(--color-surface-container-low)] p-4 rounded-xl flex justify-between items-center">
              <span className="text-[var(--color-on-surface-variant)] font-medium">Biggest Source</span>
              <span className="text-lg font-bold text-[var(--color-outline)] flex items-center gap-2">🚗 Car</span>
            </div>
          </div>
        </div>

        {/* Greener Me */}
        <div className="bg-gradient-to-b from-white to-[var(--color-surface-container-low)] p-8 rounded-3xl shadow-[0_20px_40px_rgba(45,106,79,0.12)] border border-[var(--color-secondary-container)] flex flex-col items-center text-center relative overflow-hidden transform md:-translate-y-4 transition-transform hover:-translate-y-6">
          <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)]"></div>
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6 mt-4">Greener Me</h2>
          
          <div className="w-36 h-36 bg-[var(--color-secondary-container)] rounded-full flex items-center justify-center text-6xl mb-6 shadow-lg shadow-emerald-900/20 border-4 border-white">
            🦸‍♂️
          </div>
          
          <div className="w-full space-y-4">
            <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
              <span className="text-[var(--color-on-surface)] font-medium">Eco-Score</span>
              <span className="text-2xl font-bold text-[var(--color-primary)]">82</span>
            </div>
            <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
              <span className="text-[var(--color-on-surface)] font-medium">Weekly Emissions</span>
              <span className="text-2xl font-bold text-[var(--color-primary)]">27 kg</span>
            </div>
            
            <div className="mt-6 pt-6 border-t border-[var(--color-surface-container)] flex gap-4">
              <div className="flex-1 bg-[var(--color-primary)] text-white p-4 rounded-xl">
                <span className="block text-xs uppercase tracking-wider opacity-80 mb-1">CO₂ Saved</span>
                <span className="text-2xl font-bold">18 kg</span>
              </div>
              <div className="flex-1 bg-[var(--color-secondary)] text-white p-4 rounded-xl">
                <span className="block text-xs uppercase tracking-wider opacity-80 mb-1">Money Saved</span>
                <span className="text-2xl font-bold">$15</span>
              </div>
            </div>
            
            <div className="bg-[var(--color-tertiary-container)] text-[var(--color-on-tertiary-container)] p-3 rounded-full mt-4 font-bold text-sm flex items-center justify-center gap-2">
              🏆 New Badge Unlocked: Climate Hero
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
