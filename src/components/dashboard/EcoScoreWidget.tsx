'use client';

export default function EcoScoreWidget({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let scoreColor = 'var(--color-primary)';
  if (score < 40) scoreColor = '#ef4444';
  else if (score < 70) scoreColor = '#f59e0b';

  const scoreLabel = score >= 70 ? 'Great job! 🌿' : score >= 40 ? 'On the right track! 👍' : 'Needs improvement! ⚠️';

  return (
    <div className="bg-gradient-to-b from-white to-gray-50/50 p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col items-center justify-center relative group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
      <h3
        id="eco-score-label"
        className="text-[var(--color-outline)] text-xs font-bold uppercase tracking-widest mb-6 w-full text-left"
      >
        Eco Score
      </h3>
      <div
        className="relative w-40 h-40 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500"
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-labelledby="eco-score-label"
        aria-valuetext={`${score} out of 100. ${scoreLabel}`}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: scoreColor }}
          aria-hidden="true"
        />

        <svg
          className="w-full h-full transform -rotate-90 relative z-10"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" floodColor={scoreColor} />
            </filter>
          </defs>
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke="var(--color-surface-container-low)"
            strokeWidth="8"
          />
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke={scoreColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            filter="url(#glow)"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center z-10" aria-hidden="true">
          <span className="text-5xl font-black tracking-tighter" style={{ color: scoreColor }}>{score}</span>
        </div>
      </div>
      <p className="mt-6 text-sm font-semibold text-[var(--color-on-surface-variant)] text-center">
        {scoreLabel}
      </p>
    </div>
  );
}
