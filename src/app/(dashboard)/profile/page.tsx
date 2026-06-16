'use client';

import { useAppStore } from '@/store/useAppStore';
import { checkBadges } from '@/lib/gamificationEngine';
import { ElectricityFactors, Region } from '@/lib/carbonFactors';
import { useState } from 'react';

export default function ProfilePage() {
  const user = useAppStore(state => state.user);
  const activities = useAppStore(state => state.activities);
  const region = useAppStore(state => state.region);
  const setRegion = useAppStore(state => state.setRegion);
  
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Location Tracking': true,
    'Spending Tracking': false,
    'Offset Payment': false,
  });

  const handleToggle = (service: string) => {
    setToggles(prev => ({ ...prev, [service]: !prev[service] }));
  };

  if (!user) return null;

  const friendsInvited = 1; // Mock data for now
  const unlockedBadges = checkBadges(activities.length, user.seeds, friendsInvited);

  const ALL_BADGES = [
    { id: 'Consistent Tracker', icon: '🌱', desc: '10 Logs' },
    { id: 'Seed Hoarder', icon: '💰', desc: '1000+ Seeds' },
    { id: 'Social Butterfly', icon: '🦋', desc: '1 Friend' },
    { id: 'Eco Ambassador', icon: '🌍', desc: '5 Friends' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-24">
      {/* Profile Header section with premium background */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 md:p-12">
        {/* Decorative background blobs */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--color-primary-container)] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[var(--color-secondary)] opacity-10 rounded-full blur-3xl"></div>

        <header className="relative z-10 text-center flex flex-col items-center">
          <div className="relative group cursor-default">
            {/* Animated glowing ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500 scale-110"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary-container)] rounded-full flex items-center justify-center text-white font-bold text-5xl shadow-xl border-4 border-white transform transition-transform duration-500 group-hover:scale-105">
              {user.displayName.charAt(0)}
            </div>
          </div>
          
          <h1 className="mt-6 text-4xl font-extrabold text-[var(--color-on-surface)] tracking-tight">{user.displayName}</h1>
          <p className="text-[var(--color-outline)] text-lg mt-1 font-medium">{user.email}</p>
          
          <div className="flex gap-4 md:gap-6 mt-8 w-full max-w-md">
            <div className="flex-1 bg-gradient-to-b from-white to-gray-50/50 p-5 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 group hover:-translate-y-1 transition-all duration-300">
              <p className="text-xs text-[var(--color-outline)] font-bold uppercase tracking-widest mb-1">Eco Level</p>
              <p className="font-black text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">Lv {user.level}</p>
            </div>
            <div className="flex-1 bg-gradient-to-b from-white to-gray-50/50 p-5 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 group hover:-translate-y-1 transition-all duration-300">
              <p className="text-xs text-[var(--color-outline)] font-bold uppercase tracking-widest mb-1">Total Seeds</p>
              <p className="font-black text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-secondary)] to-emerald-400">{user.seeds}</p>
            </div>
          </div>
        </header>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Badges Section */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-500">
          <h2 className="text-xl font-extrabold text-[var(--color-on-surface)] mb-6 flex items-center gap-2">
            <span className="text-2xl">🏆</span> Achievements
          </h2>
          <div className="flex flex-wrap gap-4">
            {ALL_BADGES.map(badge => {
              const isUnlocked = unlockedBadges.includes(badge.id);
              
              if (isUnlocked) {
                return (
                  <div key={badge.id} className="group flex flex-col items-center justify-center p-5 bg-gradient-to-br from-[var(--color-surface-container-low)] to-white rounded-3xl w-[100px] shadow-sm border border-[var(--color-primary)] hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer">
                    <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{badge.icon}</span>
                    <span className="text-[10px] font-bold text-center text-[var(--color-on-surface-variant)] uppercase tracking-wider">{badge.desc}</span>
                  </div>
                );
              } else {
                return (
                  <div key={badge.id} className="flex flex-col items-center justify-center p-5 bg-gray-50 rounded-3xl w-[100px] border border-gray-100 opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 cursor-help">
                    <span className="text-4xl mb-3">{badge.icon}</span>
                    <span className="text-[10px] font-bold text-center text-gray-500 uppercase tracking-wider">Locked</span>
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* Connected Services Section */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-500">
          <h2 className="text-xl font-extrabold text-[var(--color-on-surface)] mb-6 flex items-center gap-2">
            <span className="text-2xl">🔌</span> Integrations
          </h2>
          <div className="space-y-4 flex-1">
            {['Location Tracking', 'Spending Tracking', 'Offset Payment'].map((service, index) => {
              const isOn = toggles[service];
              return (
                <div 
                  key={service} 
                  className="group flex justify-between items-center p-4 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgb(0,0,0,0.05)] hover:border-gray-200 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div>
                    <p className="font-bold text-[var(--color-on-surface)] text-sm mb-0.5">{service}</p>
                    <p className="text-xs text-[var(--color-outline)] font-medium">Mock integration</p>
                  </div>
                  <button 
                    onClick={() => handleToggle(service)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 ${
                      isOn ? 'bg-[var(--color-primary)]' : 'bg-gray-200'
                    }`}
                    aria-pressed={isOn}
                  >
                    <span className="sr-only">Toggle {service}</span>
                    <span 
                      className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-300 ease-in-out ${
                        isOn ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Region Selector */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
        <h2 className="text-xl font-extrabold text-[var(--color-on-surface)] mb-2 flex items-center gap-2">
          <span className="text-2xl">🌍</span> Your Region
        </h2>
        <p className="text-sm text-[var(--color-outline)] mb-6">Adjusts electricity emission factors for accurate calculations.</p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(ElectricityFactors).map(([r, factor]) => (
            <button
              key={r}
              onClick={() => setRegion(r as Region)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                region === r
                  ? 'bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] text-white shadow-md'
                  : 'bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)]'
              }`}
            >
              {r} <span className="opacity-70 text-xs">({factor} kg/kWh)</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={async () => {
            const { auth } = await import('@/lib/firebase');
            await auth.signOut();
            useAppStore.getState().setUser(null);
          }}
          className="group relative px-6 py-2 overflow-hidden rounded-full border border-red-200 text-red-500 hover:text-white transition-colors duration-300"
        >
          <span className="absolute inset-0 w-full h-full bg-red-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          <span className="relative font-bold text-sm tracking-wide">SIGN OUT</span>
        </button>
      </div>
    </div>
  );
}
