import { useEcoStore } from '../../store/useEcoStore';

export default function DemoModeBanner() {
  const { isDemoMode, resetDemoMode } = useEcoStore();
  if (!isDemoMode) return null;
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-amber-800 text-sm">
        <span className="text-base">⚡</span>
        <strong>Demo Mode Active</strong>
        <span className="hidden sm:inline text-amber-700">— You're viewing Aarav's sample data (403.4 kg CO₂e, score 72)</span>
      </div>
      <button
        onClick={resetDemoMode}
        className="text-xs font-semibold text-amber-700 hover:text-amber-900 underline shrink-0"
      >
        Exit Demo
      </button>
    </div>
  );
}
