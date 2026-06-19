import { useMemo } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { calcPreview } from '../../lib/carbonPreview';
import type { CarbonAuditInput } from '../../types/carbon';

interface Props {
  input: Partial<CarbonAuditInput>;
}

const CATEGORY_COLORS: Record<string, string> = {
  transport: '#16a34a',
  diet: '#22c55e',
  electricity: '#f59e0b',
  shopping: '#3b82f6',
  flights: '#ef4444',
};

const CATEGORY_LABELS: Record<string, string> = {
  transport: '🚗 Transport',
  diet: '🥗 Diet',
  electricity: '⚡ Electricity',
  shopping: '🛍️ Shopping',
  flights: '✈️ Flights',
};

export default function CarbonPreview({ input }: Props) {
  const preview = useMemo(() => calcPreview(input), [input]);

  const chartData = [
    { name: 'transport', value: preview.transport },
    { name: 'diet', value: preview.diet },
    { name: 'electricity', value: preview.electricity },
    { name: 'shopping', value: preview.shopping },
    { name: 'flights', value: preview.flights },
  ].filter((d) => d.value > 0);

  const scoreColor =
    preview.score >= 70 ? '#16a34a' : preview.score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="card p-6 space-y-6 animate-fade-in" aria-live="polite" aria-atomic="true">
      <div>
        <h3 className="font-bold text-gray-900 text-lg mb-1">Live CO₂ Preview</h3>
        <p className="text-sm text-gray-500">Updates as you type</p>
      </div>

      {/* Monthly / Yearly numbers */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Monthly</p>
          <p className="text-2xl font-black text-gray-900">
            {preview.monthlyKgCO2e.toFixed(1)}
          </p>
          <p className="text-xs text-gray-400">kg CO₂e</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Yearly</p>
          <p className="text-2xl font-black text-gray-900">
            {(preview.yearlyKgCO2e / 1000).toFixed(1)}
          </p>
          <p className="text-xs text-gray-400">t CO₂e</p>
        </div>
      </div>

      {/* Eco Score */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl shadow-md"
          style={{ background: scoreColor }}
        >
          {preview.score}
        </div>
        <div>
          <p className="font-bold text-gray-900">Eco Score</p>
          <p className="text-sm text-gray-500">out of 100</p>
        </div>
      </div>

      {/* Breakdown chart */}
      {chartData.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Category Breakdown
          </p>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  dataKey="value"
                  strokeWidth={2}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: any) => [`${Number(v).toFixed(1)} kg`, '']}
                  labelFormatter={() => ''}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {chartData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: CATEGORY_COLORS[d.name] }}
                  />
                  <span className="text-gray-600">{CATEGORY_LABELS[d.name]}</span>
                </div>
                <span className="font-semibold text-gray-900">{d.value.toFixed(1)} kg</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insight */}
      {preview.monthlyKgCO2e > 0 && (
        <div className="bg-primary-light rounded-xl p-4 text-sm text-primary-dark font-medium">
          💡 {preview.insightMessage}
        </div>
      )}
    </div>
  );
}
