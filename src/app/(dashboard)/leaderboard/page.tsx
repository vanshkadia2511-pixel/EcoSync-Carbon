'use client';

import { useAppStore } from '@/store/useAppStore';
import { useState } from 'react';

export default function LeaderboardPage() {
  const leaderboard = useAppStore(state => state.leaderboard);
  const user = useAppStore(state => state.user);
  const [activeTab, setActiveTab] = useState('Friends');
  
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-24">
      <header className="mb-10 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400 opacity-[0.03] rounded-full blur-3xl"></div>
        <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-400 mb-3 tracking-tight">Leaderboard</h1>
        <p className="text-[var(--color-on-surface-variant)] text-lg font-medium">Compete with friends and your community.</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-4 justify-center">
        {['Friends', 'Squad', 'College', 'City'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3.5 rounded-full font-bold transition-all duration-300 text-sm tracking-wide ${
              activeTab === tab 
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-[0_4px_15px_rgba(245,158,11,0.3)] transform -translate-y-0.5' 
                : 'bg-white text-[var(--color-outline)] hover:bg-gray-50 hover:text-[var(--color-on-surface)] border border-gray-100 shadow-sm hover:shadow-md'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-6 bg-gray-50/50 border-b border-gray-100 text-xs font-black uppercase tracking-widest text-[var(--color-outline)]">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-4">Eco Warrior</div>
          <div className="col-span-2 text-right">Seeds</div>
          <div className="col-span-2 text-right">CO₂ Saved</div>
          <div className="col-span-2 text-center">Badge</div>
        </div>
        
        {/* List */}
        <div className="divide-y divide-gray-50">
          {leaderboard.map((lbUser, index) => {
            const isCurrentUser = user && lbUser.id === user.id;
            return (
              <div 
                key={lbUser.id} 
                className={`grid grid-cols-12 gap-4 p-6 items-center transition-all duration-300 group hover:shadow-[0_0_20px_rgb(0,0,0,0.03)] relative ${
                  isCurrentUser ? 'bg-gradient-to-r from-amber-50/50 to-orange-50/50 border-l-4 border-l-amber-400' : 'hover:bg-gray-50'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="col-span-2 flex justify-center">
                  <span className={`w-10 h-10 flex items-center justify-center rounded-2xl font-black text-lg transition-transform duration-300 group-hover:scale-110 ${
                    lbUser.rank === 1 ? 'bg-gradient-to-br from-yellow-300 to-amber-500 text-white shadow-md' :
                    lbUser.rank === 2 ? 'bg-gradient-to-br from-gray-200 to-gray-400 text-white shadow-md' :
                    lbUser.rank === 3 ? 'bg-gradient-to-br from-orange-200 to-orange-400 text-white shadow-md' :
                    'bg-gray-50 text-[var(--color-outline)] border border-gray-100'
                  }`}>
                    {lbUser.rank}
                  </span>
                </div>
                <div className="col-span-4 font-extrabold text-[var(--color-on-surface)] flex items-center gap-4">
                  <div className={`relative w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shadow-inner ${
                    isCurrentUser ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-gray-300 to-gray-400'
                  }`}>
                    {lbUser.displayName.charAt(0)}
                    {isCurrentUser && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white"></span>
                      </span>
                    )}
                  </div>
                  <div>
                    {lbUser.displayName} 
                    {isCurrentUser && <span className="block text-xs font-bold text-amber-600 uppercase tracking-widest mt-0.5">YOU</span>}
                  </div>
                </div>
                <div className="col-span-2 text-right font-black text-lg text-[var(--color-secondary)]">
                  {lbUser.seeds}
                </div>
                <div className="col-span-2 text-right font-bold text-[var(--color-on-surface-variant)] flex flex-col items-end">
                  <span>{lbUser.co2SavedKg} <span className="text-xs text-[var(--color-outline)] font-semibold">kg</span></span>
                </div>
                <div className="col-span-2 text-center text-3xl group-hover:scale-125 transition-transform duration-500 origin-center" title={lbUser.badge}>
                  {lbUser.badge.split(' ')[0]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
