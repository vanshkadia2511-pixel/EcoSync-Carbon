export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full bg-ecosync-card border-t border-gray-100 flex justify-around p-3 pb-6 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col items-center text-ecosync-primary">
        <span className="text-xl mb-1">🏠</span>
        <span className="text-[10px] font-medium">Home</span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <span className="text-xl mb-1">➕</span>
        <span className="text-[10px] font-medium">Log</span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <span className="text-xl mb-1">🤖</span>
        <span className="text-[10px] font-medium">Coach</span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <span className="text-xl mb-1">⚙️</span>
        <span className="text-[10px] font-medium">Settings</span>
      </div>
    </nav>
  );
}
