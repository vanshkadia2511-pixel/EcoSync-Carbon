import { Activity } from '../types';

export default function ActivityCard({ activity }: { activity: Activity }) {
  const getIcon = (cat: string) => {
    switch (cat) {
      case 'Transport': return '🚗';
      case 'Food': return '🍽️';
      case 'Energy': return '⚡';
      case 'Shopping': return '🛍️';
      default: return '♻️';
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-xl">
          {getIcon(activity.category)}
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-800 capitalize">{activity.type.replace(/_/g, ' ')}</p>
          <p className="text-xs text-slate-500">
            {activity.value} {activity.unit} • {new Date(activity.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-sm text-ecotrack-primary">{activity.emissionKg.toFixed(1)} kg</p>
        <p className="text-[10px] text-slate-400">CO2e</p>
      </div>
    </div>
  );
}
