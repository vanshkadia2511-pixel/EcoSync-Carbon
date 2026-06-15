'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import {
  DEMO_USER,
  DEMO_ACTIVITIES,
  DEMO_CHALLENGES,
  DEMO_RECOMMENDATIONS,
  DEMO_LEADERBOARD,
} from "@/lib/demoMode";
import LoginButton from "@/components/auth/LoginButton";

export default function WelcomePage() {
  const router = useRouter();
  const { setUser, addActivity, setChallenges, setRecommendations, setLeaderboard } = useAppStore();

  const activateDemo = () => {
    setUser(DEMO_USER);
    DEMO_ACTIVITIES.forEach(a => addActivity(a));
    setChallenges(DEMO_CHALLENGES);
    setRecommendations(DEMO_RECOMMENDATIONS);
    setLeaderboard(DEMO_LEADERBOARD);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex flex-col items-center justify-center p-8 text-[var(--color-on-surface)]">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] text-sm font-semibold px-4 py-1.5 rounded-full">
              <span className="animate-pulse">🌱</span> Carbon Companion App
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-[var(--color-primary)]">
              EcoSync
            </h1>
            <p className="text-xl lg:text-2xl text-[var(--color-on-surface-variant)] max-w-lg leading-relaxed">
              Track your lifestyle. Reduce your carbon impact.
            </p>
          </div>

          <p className="text-lg text-[var(--color-on-surface-variant)] max-w-md">
            Join thousands of others making small changes that add up to a massive environmental difference. Clean, simple, and rewarding.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-emerald-900/20 w-fit"
            >
              Start My Eco Journey →
            </Link>
            <LoginButton />
          </div>

          {/* Demo Mode CTA */}
          <div className="flex items-center gap-4 pt-2">
            <div className="h-px flex-1 bg-[var(--color-surface-container)]" />
            <span className="text-xs text-[var(--color-outline)] font-medium">FOR DEMO</span>
            <div className="h-px flex-1 bg-[var(--color-surface-container)]" />
          </div>
          <button
            onClick={activateDemo}
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-surface-container-low)] border-2 border-dashed border-[var(--color-outline)] text-[var(--color-on-surface-variant)] px-6 py-3 rounded-full font-semibold text-base hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)] transition-all w-fit"
          >
            <span>⚡</span> Load Demo — See Aarav's Journey
          </button>
        </div>

        {/* Right Content - Floating Cards */}
        <div className="relative h-[600px] hidden lg:block">
          {/* Card 1: Eco Score */}
          <div className="absolute top-10 right-20 bg-white p-6 rounded-3xl shadow-[0_12px_30px_rgba(45,106,79,0.08)] border border-[var(--color-surface-container)] w-64 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-[var(--color-on-surface-variant)] text-sm font-medium mb-2">Eco-Score</h3>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold text-[var(--color-primary)]">74</span>
              <span className="text-lg text-[var(--color-outline)] font-medium mb-1">/100</span>
            </div>
            <div className="mt-4 w-full bg-[var(--color-surface-container-low)] rounded-full h-2">
              <div className="bg-[var(--color-secondary)] h-2 rounded-full w-[74%] transition-all duration-1000" />
            </div>
            <p className="text-xs text-[var(--color-secondary)] font-semibold mt-2">↑ +6 this week</p>
          </div>

          {/* Card 2: CO2 Saved */}
          <div className="absolute top-48 right-64 bg-white p-6 rounded-3xl shadow-[0_12px_30px_rgba(45,106,79,0.08)] border border-[var(--color-surface-container)] w-64 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-tertiary-container)] flex items-center justify-center text-[var(--color-on-tertiary-container)]">
                🌿
              </div>
              <div>
                <h3 className="text-[var(--color-on-surface-variant)] text-sm font-medium">CO₂ Saved</h3>
                <p className="text-2xl font-bold text-[var(--color-primary)]">16.3 kg</p>
              </div>
            </div>
          </div>

          {/* Card 3: Seeds */}
          <div className="absolute top-80 right-8 bg-white p-5 rounded-3xl shadow-[0_12px_30px_rgba(45,106,79,0.08)] border border-[var(--color-surface-container)] w-52 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌱</span>
              <div>
                <p className="text-sm text-[var(--color-outline)]">Seeds Earned</p>
                <p className="text-2xl font-bold text-[var(--color-primary)]">1,240</p>
              </div>
            </div>
          </div>

          {/* Card 4: Challenge */}
          <div className="absolute bottom-20 right-20 bg-white p-6 rounded-3xl shadow-[0_12px_30px_rgba(45,106,79,0.08)] border border-[var(--color-surface-container)] w-72 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-[var(--color-on-surface-variant)] text-sm font-medium">Active Challenge</h3>
              <span className="bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] text-xs px-2 py-1 rounded-full font-bold">
                +200 Seeds
              </span>
            </div>
            <p className="text-lg font-semibold text-[var(--color-on-surface)] mb-4">
              Public Transport Week
            </p>
            <div className="w-full bg-[var(--color-surface-container-low)] rounded-full h-2">
              <div className="bg-[var(--color-secondary)] h-2 rounded-full w-[80%]" />
            </div>
            <p className="text-xs text-[var(--color-outline)] mt-2 text-right">4/5 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
