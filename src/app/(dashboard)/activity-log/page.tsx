'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Activity } from '@/types';
import { calculateTransportEmission } from '@/lib/calculateEmission';
import { calculateEcoScore } from '@/lib/calculateEcoScore';
import { saveActivity } from '@/lib/db';
import { CarbonFactors } from '@/lib/carbonFactors';

type TransportMode = keyof typeof CarbonFactors.transport;

const CATEGORIES = ['Transport', 'Food', 'Energy', 'Shopping', 'Waste'];

export default function ActivityLogPage() {
  const [activeTab, setActiveTab] = useState('Transport');
  const activities = useAppStore(state => state.activities);
  const addActivity = useAppStore(state => state.addActivity);
  const addSeeds = useAppStore(state => state.addSeeds);
  const updateEcoScore = useAppStore(state => state.updateEcoScore);
  const user = useAppStore(state => state.user);

  const [mode, setMode] = useState<TransportMode>('car');
  const [distance, setDistance] = useState('');

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!distance) return;

    const emissionKg = calculateTransportEmission(mode, Number(distance));
    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      category: 'Transport',
      type: mode,
      value: Number(distance),
      unit: 'km',
      emissionKg,
      createdAt: new Date().toISOString()
    };

    addActivity(newActivity);
    addSeeds(10); // Base reward for logging
    if (user) {
      // Calculate current weekly emissions based on activities (simplified for MVP)
      const currentWeeklyEmissions = activities.reduce((sum, act) => sum + act.emissionKg, 0) + emissionKg;
      const newScore = calculateEcoScore(currentWeeklyEmissions, user.weeklyBudgetKg, user.currentStreak);
      updateEcoScore(newScore);

      // Persist to Firebase
      try {
        await saveActivity(user.id, newActivity);
      } catch (e) {
        console.warn("Could not save activity to Firebase", e);
      }
    }
    
    setDistance('');
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-24">
      <header className="mb-10 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--color-primary)] opacity-[0.03] rounded-full blur-2xl"></div>
        <h1 className="text-4xl font-extrabold text-[var(--color-primary)] mb-2 tracking-tight">Activity Log</h1>
        <p className="text-[var(--color-on-surface-variant)] text-lg font-medium">Log your daily activities and see their impact instantly.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form Column */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-2xl whitespace-nowrap text-sm font-bold transition-all duration-300 ${
                  activeTab === cat 
                    ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-md transform -translate-y-0.5' 
                    : 'bg-gray-50 text-[var(--color-outline)] hover:bg-gray-100 hover:text-[var(--color-on-surface)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <form onSubmit={handleAddActivity} className="space-y-8">
            {activeTab === 'Transport' ? (
              <>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-[var(--color-outline)] uppercase tracking-widest">Mode of Transport</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'walk', icon: '🚶', label: 'Walk' },
                      { id: 'bike', icon: '🚲', label: 'Bike' },
                      { id: 'bus', icon: '🚌', label: 'Bus' },
                      { id: 'train', icon: '🚆', label: 'Train' },
                      { id: 'car', icon: '🚗', label: 'Car' },
                      { id: 'flight', icon: '✈️', label: 'Flight' },
                    ].map(m => (
                      <button
                        key={m.id}
                        type="button"
                      onClick={() => setMode(m.id as TransportMode)}
                        className={`flex flex-col items-center justify-center py-4 rounded-2xl border-2 transition-all duration-300 ${
                          mode === m.id 
                            ? 'border-[var(--color-secondary)] bg-emerald-50 text-[var(--color-secondary)] shadow-sm scale-[1.02]' 
                            : 'border-transparent bg-gray-50 hover:bg-gray-100 text-[var(--color-outline)] hover:text-[var(--color-on-surface)]'
                        }`}
                      >
                        <span className={`text-3xl transition-transform duration-300 ${mode === m.id ? 'scale-110 mb-2' : 'mb-1'}`}>{m.icon}</span>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                   <label htmlFor="distance-input" className="text-xs font-bold text-[var(--color-outline)] uppercase tracking-widest">Distance (km)</label>
                  <div className="relative">
                    <input 
                      id="distance-input"
                      type="number" 
                      min="0"
                      max="10000"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 font-bold text-lg text-[var(--color-on-surface)] focus:bg-white focus:border-[var(--color-primary)] focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300"
                      placeholder="e.g. 15"
                      aria-label="Distance in kilometres"
                    />
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                      <span className="text-gray-400 font-bold">km</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-16 text-center text-[var(--color-outline)] bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <span className="text-4xl block mb-4 opacity-50">🚧</span>
                <p className="font-semibold text-lg">Forms for {activeTab} coming soon.</p>
              </div>
            )}

            <button 
              type="submit"
              disabled={!distance && activeTab === 'Transport'}
              className="w-full bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] text-white py-4 rounded-2xl font-extrabold text-lg hover:shadow-lg hover:shadow-emerald-900/20 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:cursor-not-allowed group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
              <span>Add Activity</span>
            </button>
          </form>
        </div>

        {/* Recent Activities Column */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-[var(--color-on-surface)] px-2">Recent Activities</h2>
          <div className="space-y-4">
            {activities.slice(0, 8).map((activity, index) => (
              <div 
                key={activity.id} 
                className="bg-white p-5 rounded-[2rem] flex items-center justify-between shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-[1.25rem] flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {activity.category === 'Transport' ? '🚗' : 
                     activity.category === 'Food' ? '🍽️' : 
                     activity.category === 'Energy' ? '⚡' : '🛍️'}
                  </div>
                  <div>
                    <p className="font-extrabold text-lg text-[var(--color-on-surface)] mb-0.5">{activity.category}</p>
                    <p className="text-xs font-semibold text-[var(--color-outline)] uppercase tracking-wider">
                      {activity.type.replace('_', ' ')} <span className="mx-1">•</span> {activity.value} {activity.unit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-lg text-[var(--color-primary)]">+{activity.emissionKg.toFixed(1)} <span className="text-xs text-[var(--color-outline)]">kg</span></p>
                  <p className="text-[10px] font-bold text-[var(--color-secondary)] uppercase tracking-widest bg-emerald-50 inline-block px-2 py-0.5 rounded-full mt-1">10 Seeds</p>
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <div className="py-12 text-center bg-white rounded-[2rem] shadow-sm border border-gray-100">
                <span className="text-5xl block mb-4">🍃</span>
                <p className="text-gray-500 font-medium">No activities logged yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
