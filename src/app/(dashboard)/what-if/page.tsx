'use client';

import { useState } from 'react';

export default function WhatIfSimulatorPage() {
  const [transportSwap, setTransportSwap] = useState(false);
  const [mealSwap, setMealSwap] = useState(false);
  const [energyReduction, setEnergyReduction] = useState(false);
  
  // Fake calculation based on toggles
  const weeklySaved = (transportSwap ? 18 : 0) + (mealSwap ? 8 : 0) + (energyReduction ? 4 : 0);
  const monthlySaved = weeklySaved * 4.33;
  const yearlySaved = weeklySaved * 52;
  const moneySaved = weeklySaved * 1.5; // ~$1.50 saved per kg CO2 for demo purposes

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fade-in-up">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-2">What-If Simulator</h1>
        <p className="text-[var(--color-on-surface-variant)] text-lg">Test future choices to see how they impact your carbon footprint and wallet.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-surface-container)] space-y-6">
          <h2 className="text-xl font-bold text-[var(--color-on-surface)] mb-4">Simulate Changes</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl border border-[var(--color-surface-container)] hover:bg-[var(--color-surface-container-low)] transition-colors cursor-pointer" onClick={() => setTransportSwap(!transportSwap)}>
              <div className="flex items-center gap-4">
                <span className="text-3xl">🚲</span>
                <div>
                  <p className="font-semibold text-[var(--color-on-surface)]">Bike instead of Car</p>
                  <p className="text-sm text-[var(--color-outline)]">3 days per week</p>
                </div>
              </div>
              <div className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors ${transportSwap ? 'bg-[var(--color-primary)] justify-end' : 'bg-gray-300 justify-start'}`}>
                <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl border border-[var(--color-surface-container)] hover:bg-[var(--color-surface-container-low)] transition-colors cursor-pointer" onClick={() => setMealSwap(!mealSwap)}>
              <div className="flex items-center gap-4">
                <span className="text-3xl">🥗</span>
                <div>
                  <p className="font-semibold text-[var(--color-on-surface)]">Plant-Based Meals</p>
                  <p className="text-sm text-[var(--color-outline)]">4 meals per week</p>
                </div>
              </div>
              <div className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors ${mealSwap ? 'bg-[var(--color-primary)] justify-end' : 'bg-gray-300 justify-start'}`}>
                <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl border border-[var(--color-surface-container)] hover:bg-[var(--color-surface-container-low)] transition-colors cursor-pointer" onClick={() => setEnergyReduction(!energyReduction)}>
              <div className="flex items-center gap-4">
                <span className="text-3xl">🔌</span>
                <div>
                  <p className="font-semibold text-[var(--color-on-surface)]">Reduce Electricity</p>
                  <p className="text-sm text-[var(--color-outline)]">Unplug unused devices</p>
                </div>
              </div>
              <div className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors ${energyReduction ? 'bg-[var(--color-primary)] justify-end' : 'bg-gray-300 justify-start'}`}>
                <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="bg-[var(--color-surface-container-low)] p-8 rounded-3xl border border-[var(--color-surface-container)] flex flex-col justify-center">
          <h2 className="text-xl font-bold text-[var(--color-on-surface)] mb-6 text-center">Projected Impact</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
              <p className="text-xs text-[var(--color-outline)] font-medium uppercase tracking-wider mb-2">Weekly Save</p>
              <p className="text-3xl font-bold text-[var(--color-primary)]">{weeklySaved.toFixed(1)} <span className="text-base text-[var(--color-outline)]">kg</span></p>
            </div>
            <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
              <p className="text-xs text-[var(--color-outline)] font-medium uppercase tracking-wider mb-2">Monthly Save</p>
              <p className="text-3xl font-bold text-[var(--color-primary)]">{monthlySaved.toFixed(1)} <span className="text-base text-[var(--color-outline)]">kg</span></p>
            </div>
            <div className="bg-white p-6 rounded-2xl text-center shadow-sm col-span-2">
              <p className="text-xs text-[var(--color-outline)] font-medium uppercase tracking-wider mb-2">Yearly Save</p>
              <p className="text-4xl font-bold text-[var(--color-primary)]">{yearlySaved.toFixed(1)} <span className="text-lg text-[var(--color-outline)]">kg CO₂</span></p>
            </div>
            <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary-container)] p-6 rounded-2xl text-center shadow-lg shadow-emerald-900/20 col-span-2 text-white">
              <p className="text-xs text-white/80 font-medium uppercase tracking-wider mb-2">Estimated Money Saved</p>
              <p className="text-4xl font-bold">${moneySaved.toFixed(2)} <span className="text-lg text-white/80">/ week</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
