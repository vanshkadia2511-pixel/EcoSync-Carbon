export default function EcoScoreChart({ score, budget }: { score: number, budget: number }) {
  // A simple visual representation using a circular progress ring
  const percentage = Math.min(100, Math.max(0, score));
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center mb-6">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r="45"
          className="stroke-slate-100"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="50" cy="50" r="45"
          className="stroke-ecosync-primary transition-all duration-1000 ease-out"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-4xl font-bold tracking-tighter text-slate-800">{score}</p>
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Eco-Score</p>
      </div>
    </div>
  );
}
