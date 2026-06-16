'use client';
import { useAppStore } from '../store/useAppStore';

export default function Header() {
  const user = useAppStore(state => state.user);
  
  if (!user) return null;

  return (
    <header className="bg-ecotrack-primary text-white p-4 shadow-md sticky top-0 z-50 flex justify-between items-center rounded-b-xl">
      <div>
        <h1 className="text-xl font-bold tracking-tight">EcoTrack</h1>
        <p className="text-xs opacity-90 mt-0.5">Level {user.level}</p>
      </div>
      <div className="flex items-center gap-4 bg-white/20 px-3 py-1.5 rounded-full">
        <div className="text-right flex items-center gap-1.5">
          <span className="text-sm">🌱</span>
          <p className="font-semibold text-sm">{user.seeds}</p>
        </div>
      </div>
    </header>
  );
}
