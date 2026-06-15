'use client';

import { useAppStore } from '@/store/useAppStore';
import EcoScoreWidget from '@/components/dashboard/EcoScoreWidget';
import CategoryChart from '@/components/dashboard/CategoryChart';
import SmartNudgeCard from '@/components/dashboard/SmartNudgeCard';

export default function DashboardPage() {
  const user = useAppStore(state => state.user);
  const activities = useAppStore(state => state.activities);

  if (!user) return null;

  const totalEmissions = activities.reduce((sum, act) => sum + act.emissionKg, 0);
  const budgetProgress = (totalEmissions / user.weeklyBudgetKg) * 100;

  // Simple category calculation
  const categoryData = ['Transport', 'Food', 'Energy', 'Shopping', 'Waste'].map(cat => ({
    name: cat,
    value: activities.filter(a => a.category === cat).reduce((sum, a) => sum + a.emissionKg, 0) || 1 // fallback to 1 for demo pie chart if empty
  }));

  const biggestSource = [...categoryData].sort((a, b) => b.value - a.value)[0];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in-up pb-24">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 md:p-10 mb-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary-container)] opacity-[0.05] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--color-on-surface)] tracking-tight mb-2">
              Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">{user.displayName.split(' ')[0]}</span>
            </h1>
            <p className="text-[var(--color-on-surface-variant)] text-lg font-medium">Here's your impact overview for this week.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-5 py-3 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex items-center gap-3 hover:-translate-y-1 transition-transform duration-300">
              <span className="text-3xl drop-shadow-sm">🔥</span>
              <div>
                <p className="text-[10px] text-[var(--color-outline)] font-bold uppercase tracking-wider">Current Streak</p>
                <p className="font-black text-lg text-[var(--color-on-surface)] leading-tight">{user.currentStreak} Days</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] px-5 py-3 rounded-2xl shadow-lg shadow-emerald-900/20 flex items-center gap-3 hover:-translate-y-1 transition-transform duration-300">
              <span className="text-3xl drop-shadow-md">🌱</span>
              <div>
                <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-wider">Total Seeds</p>
                <p className="font-black text-lg text-white leading-tight">{user.seeds}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Stats Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EcoScoreWidget score={user.ecoScore} />
            
            <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <span className="text-8xl">☁️</span>
              </div>
              <h3 className="text-[var(--color-outline)] text-xs font-bold uppercase tracking-widest mb-4">Today's Emissions</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-[var(--color-on-surface)] to-gray-500 tracking-tighter">
                  {totalEmissions.toFixed(1)}
                </span>
                <span className="text-xl text-[var(--color-outline)] font-bold mb-1">kg CO₂</span>
              </div>
              
              <div className="mt-8 z-10 relative">
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-[var(--color-on-surface-variant)]">Weekly Budget Progress</span>
                  <span className={budgetProgress > 100 ? "text-red-500 font-black" : "text-[var(--color-secondary)] font-black"}>
                    {Math.round(budgetProgress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out relative ${budgetProgress > 100 ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)]'}`}
                    style={{ width: `${Math.min(100, budgetProgress)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full h-full transform -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
            <h3 className="text-xl font-extrabold text-[var(--color-on-surface)] mb-6">Category Breakdown</h3>
            <div className="h-72">
              <CategoryChart data={categoryData} />
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          <SmartNudgeCard />
          
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-shadow duration-300">
            <h3 className="text-[var(--color-outline)] text-xs font-bold uppercase tracking-widest mb-6">Biggest Source</h3>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-[0_4px_15px_rgb(0,0,0,0.05)] border border-gray-50 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                {biggestSource.name === 'Transport' ? '🚗' : biggestSource.name === 'Food' ? '🍔' : biggestSource.name === 'Energy' ? '⚡' : biggestSource.name === 'Shopping' ? '🛍️' : '🗑️'}
              </div>
              <div>
                <p className="font-extrabold text-2xl text-[var(--color-on-surface)]">{biggestSource.name}</p>
                <p className="text-[var(--color-primary)] font-bold mt-1">{biggestSource.value.toFixed(1)} kg CO₂</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
