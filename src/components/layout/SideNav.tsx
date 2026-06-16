'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Activity Log', href: '/activity-log', icon: '📝' },
  { name: 'Coach', href: '/coach', icon: '🤖' },
  { name: 'What-If Simulator', href: '/what-if', icon: '🔮' },
  { name: 'My Carbon Twin', href: '/carbon-twin', icon: '🧍' },
  { name: 'Challenges', href: '/challenges', icon: '🏆' },
  { name: 'Leaderboard', href: '/leaderboard', icon: '🥇' },
  { name: 'Passive Tracking', href: '/tracking', icon: '📍' },
  { name: 'Profile', href: '/profile', icon: '👤' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
];

export default function SideNav() {
  const pathname = usePathname();
  const user = useAppStore((state) => state.user);

  return (
    <aside className="w-64 bg-white shadow-[8px_0_30px_rgb(0,0,0,0.02)] hidden md:flex flex-col h-screen sticky top-0 z-50" aria-label="Main navigation">
      <div className="p-8 pb-4">
        <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] tracking-tight">EcoTrack</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-semibold text-[15px] ${
                isActive 
                  ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-md' 
                  : 'text-[var(--color-on-surface-variant)] hover:bg-gray-50 hover:text-[var(--color-on-surface)] hover:-translate-y-0.5'
              }`}
            >
              <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} aria-hidden="true">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="p-4 relative before:absolute before:top-0 before:left-4 before:right-4 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent">
          <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md hover:border-gray-200 transition-all cursor-default">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary-container)] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner">
              {user.displayName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-[var(--color-on-surface)] text-sm truncate">{user.displayName}</p>
              <p className="text-xs font-semibold text-[var(--color-primary)] flex items-center gap-1">
                <span>⭐</span> {user.ecoScore}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
