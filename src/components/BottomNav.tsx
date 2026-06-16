'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mobileNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'Log', href: '/activity-log', icon: '📝' },
  { name: 'Coach', href: '/coach', icon: '🤖' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
  { name: 'Profile', href: '/profile', icon: '👤' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-surface-container)] flex justify-around items-center p-3 pb-6 z-50 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] md:hidden" aria-label="Mobile navigation">
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive 
                ? 'text-[var(--color-primary)] font-bold scale-105' 
                : 'text-[var(--color-on-surface-variant)] opacity-70 hover:opacity-100'
            }`}
          >
            <span className="text-xl" aria-hidden="true">{item.icon}</span>
            <span className="text-[10px] font-medium tracking-tight">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
