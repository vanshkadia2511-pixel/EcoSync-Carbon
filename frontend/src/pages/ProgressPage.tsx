import { useEcoStore } from '../store/useEcoStore';

export default function ProgressPage() {
  const { history, badges, challenges, seeds, updateChallengeProgress, addSeeds, unlockBadge } = useEcoStore();

  const handleCompleteChallenge = (id: string, reward: number, category: string) => {
    // Mark as completed in store
    updateChallengeProgress(id, 100); // Set progress to 100% or equal to target
    // In our store, complete challenges adds seeds and unlocks badges
    addSeeds(reward);
    
    // Auto-unlock badge based on category
    if (category === 'transport') {
      unlockBadge('transit_hero');
    } else if (category === 'electricity') {
      unlockBadge('energy_saver');
    } else if (category === 'shopping') {
      unlockBadge('low_waste_week');
    } else if (category === 'diet') {
      unlockBadge('plant_plate');
    }
  };

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Green Progress</h1>
        <p className="text-gray-500 mt-1">Track challenges completed, badges earned, and historical audit history.</p>
      </div>

      {/* Gamification Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">Seeds Balance</span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-3xl font-extrabold text-green-600">🌱 {seeds}</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">Earn seeds by finishing challenges & quiz</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">Badges Unlocked</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-extrabold text-gray-900">{unlockedCount}</span>
              <span className="text-sm font-semibold text-gray-400">/ {badges.length}</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">{badges.length - unlockedCount} remaining</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">Audits Completed</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-extrabold text-gray-900">{history.length}</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">{history.length >= 3 ? 'Consistency Champion unlocked!' : `${3 - history.length} more for badge`}</div>
        </div>
      </div>

      {/* Main Grid: Challenges + Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Weekly Challenges */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Active Challenges</h3>
            <div className="space-y-4">
              {challenges.length > 0 ? (
                challenges.map((c) => {
                  const isCompleted = c.completed || c.progress >= c.target;
                  const pct = Math.min(100, Math.round((c.progress / c.target) * 100));

                  return (
                    <div key={c.challengeId} className={`p-5 rounded-xl border transition-all ${
                      isCompleted ? 'bg-green-50/50 border-green-200' : 'bg-gray-50 border-gray-100'
                    }`}>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-800">{c.title}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                              {c.category}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">{c.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-green-700 block">🌱 +{c.rewardSeeds}</span>
                          <span className="text-[10px] text-gray-400 block mt-1">Impact: -{c.estimatedImpactKg}kg CO₂e</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                          <span>Progress: {c.progress} / {c.target}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Action Button */}
                      {!isCompleted && (
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => handleCompleteChallenge(c.challengeId, c.rewardSeeds, c.category)}
                            className="px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition duration-150 shadow-sm"
                          >
                            Mark as Done
                          </button>
                        </div>
                      )}
                      {isCompleted && (
                        <div className="mt-4 flex justify-end text-xs font-bold text-green-700 items-center gap-1">
                          ✅ Completed!
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No active challenges. Take an audit or activate demo mode to get challenges.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Badges & Achievements</h3>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                  b.unlocked
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm'
                    : 'bg-gray-50 border-gray-100 opacity-60'
                }`}
              >
                <span className="text-3xl mb-2 filter drop-shadow-sm">{b.icon}</span>
                <span className="text-xs font-bold text-gray-800">{b.name}</span>
                <p className="text-[10px] text-gray-500 mt-1 leading-normal">{b.description}</p>
                {b.unlocked && (
                  <span className="text-[9px] font-bold text-green-700 mt-2 bg-green-100 px-2 py-0.5 rounded-full">
                    Unlocked
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Logs */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Audit History</h3>
        {history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-lg">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Eco Score</th>
                  <th className="px-6 py-3">Monthly Footprint</th>
                  <th className="px-6 py-3">Highest Contributor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {history.map((record) => (
                  <tr key={record.recordId} className="hover:bg-gray-50/55 transition duration-150">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {new Date(record.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${record.score >= 70 ? 'text-green-600' : record.score >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
                        {record.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">{record.monthlyKgCO2e} kg CO₂e</td>
                    <td className="px-6 py-4 capitalize">{record.highestCategory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            No audits taken yet. Use the Audit page to estimate your carbon footprint.
          </div>
        )}
      </div>
    </div>
  );
}
