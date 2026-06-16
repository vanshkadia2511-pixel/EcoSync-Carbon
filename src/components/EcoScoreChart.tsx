'use client';

import { useState } from 'react';

export default function EcoScoreChart({ score, budget }: { score: number, budget: number }) {
  const percentage = Math.min(100, Math.max(0, score));
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareText = `🌿 My EcoTrack Eco-Score is ${score}/100! I'm reducing my carbon footprint one day at a time. Track yours at EcoTrack.`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My EcoTrack Score', text: shareText, url: window.location.origin });
      } catch (_) {}
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-col items-center">
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
            className="stroke-ecotrack-primary transition-all duration-1000 ease-out"
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

      <button
        onClick={handleShare}
        className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] text-white hover:opacity-90 transition-all shadow-md shadow-emerald-900/10 active:scale-95"
      >
        {copied ? '✅ Copied!' : '📤 Share My Impact'}
      </button>
    </div>
  );
}

