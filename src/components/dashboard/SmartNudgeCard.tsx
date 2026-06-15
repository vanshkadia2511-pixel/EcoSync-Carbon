'use client';

export default function SmartNudgeCard() {
  return (
    <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary-container)] p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-900/20 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
      {/* Decorative circle */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500"></div>
      
      <div className="flex items-center gap-2 mb-6">
        <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10">Smart Nudge 💡</span>
      </div>
      
      <h3 className="text-2xl font-extrabold mb-3 tracking-tight">Swap 2 meat meals</h3>
      <p className="text-white/80 text-sm mb-8 leading-relaxed font-medium">
        Food is a major contributor this week. Try swapping to plant-based meals to save up to <strong className="text-white">5kg CO₂</strong>.
      </p>
      
      <div className="flex gap-3">
        <button className="flex-1 bg-white text-[var(--color-primary)] font-bold py-3.5 rounded-2xl hover:bg-gray-50 hover:shadow-lg transition-all duration-300 transform active:scale-95">
          Accept Challenge
        </button>
      </div>
    </div>
  );
}
