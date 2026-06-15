'use client';

import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import {
  DEMO_USER,
  DEMO_ACTIVITIES,
  DEMO_CHALLENGES,
  DEMO_RECOMMENDATIONS,
  DEMO_LEADERBOARD,
} from '@/lib/demoMode';

export default function DemoModeBanner() {
  const router = useRouter();
  const { setUser, addActivity, setChallenges, setRecommendations, setLeaderboard } =
    useAppStore();

  const isDemoActive = useAppStore(s => s.user?.id === 'demo_aarav_001');

  const activateDemo = () => {
    setUser(DEMO_USER);
    DEMO_ACTIVITIES.forEach(a => addActivity(a));
    setChallenges(DEMO_CHALLENGES);
    setRecommendations(DEMO_RECOMMENDATIONS);
    setLeaderboard(DEMO_LEADERBOARD);
    router.push('/dashboard');
  };

  if (isDemoActive) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={activateDemo}
        className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-3 rounded-full font-bold shadow-lg shadow-[var(--color-primary)]/30 hover:scale-105 active:scale-95 transition-transform text-sm"
      >
        <span className="animate-pulse">⚡</span>
        Load Demo Mode
      </button>
    </div>
  );
}
