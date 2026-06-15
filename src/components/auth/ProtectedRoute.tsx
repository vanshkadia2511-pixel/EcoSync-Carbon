'use client';

import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAppStore(state => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[var(--color-on-surface-variant)] font-medium">Redirecting to login...</p>
      </div>
    );
  }

  return <>{children}</>;
}
