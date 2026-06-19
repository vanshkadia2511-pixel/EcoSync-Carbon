import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcoStore } from '../../store/useEcoStore';
import { api } from '../../lib/api';
import { calcPreview } from '../../lib/carbonPreview';
import { DEMO_AUDIT_INPUT, DEMO_FOOTPRINT } from '../../lib/demoData';
import CarbonPreview from './CarbonPreview';
import type { CarbonAuditInput, TransportMode, DietType, ShoppingLevel } from '../../types/carbon';

const TRANSPORT_OPTIONS: { value: TransportMode; label: string; icon: string }[] = [
  { value: 'car', label: 'Car', icon: '🚗' },
  { value: 'bus', label: 'Bus', icon: '🚌' },
  { value: 'train', label: 'Train / Metro', icon: '🚆' },
  { value: 'bike', label: 'Bike', icon: '🚲' },
  { value: 'walk', label: 'Walk', icon: '🚶' },
];

const DIET_OPTIONS: { value: DietType; label: string; icon: string; sub: string }[] = [
  { value: 'vegan', label: 'Vegan', icon: '🌱', sub: '55 kg CO₂e/mo' },
  { value: 'vegetarian', label: 'Vegetarian', icon: '🥗', sub: '85 kg CO₂e/mo' },
  { value: 'omnivore', label: 'Omnivore', icon: '🍽️', sub: '150 kg CO₂e/mo' },
  { value: 'meat-heavy', label: 'Meat-heavy', icon: '🥩', sub: '230 kg CO₂e/mo' },
];

const SHOPPING_OPTIONS: { value: ShoppingLevel; label: string; sub: string }[] = [
  { value: 'low', label: 'Low', sub: 'Minimal non-essentials' },
  { value: 'medium', label: 'Medium', sub: 'Occasional shopping' },
  { value: 'high', label: 'High', sub: 'Frequent purchases' },
];

export default function CarbonAuditForm() {
  const navigate = useNavigate();
  const { sessionId, setLatestFootprint, activateDemoMode } = useEcoStore();

  const [form, setForm] = useState<Partial<CarbonAuditInput>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (patch: Partial<CarbonAuditInput>) => setForm((f) => ({ ...f, ...patch }));

  const handleDemoFill = () => {
    activateDemoMode();
    navigate('/dashboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.transport?.mode || !form.diet || !form.electricityKwhPerMonth || !form.shoppingLevel) {
      setError('Please complete all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    const input: CarbonAuditInput = {
      sessionId,
      transport: { mode: form.transport.mode, kmPerWeek: form.transport.kmPerWeek ?? 0 },
      diet: form.diet,
      electricityKwhPerMonth: form.electricityKwhPerMonth,
      shoppingLevel: form.shoppingLevel,
      flightKmPerMonth: form.flightKmPerMonth ?? 0,
      householdSize: form.householdSize ?? 1,
    };

    try {
      const record = await api.audit(input);
      setLatestFootprint(record);
      navigate('/dashboard');
    } catch {
      // Backend unreachable — use client-side calculation as fallback
      const preview = calcPreview(input);
      const record = {
        recordId: `local_${Date.now()}`,
        sessionId,
        createdAt: new Date().toISOString(),
        monthlyKgCO2e: preview.monthlyKgCO2e,
        yearlyKgCO2e: preview.yearlyKgCO2e,
        score: preview.score,
        highestCategory: preview.highestCategory as 'transport' | 'diet' | 'electricity' | 'shopping' | 'flights',
        breakdown: {
          transport: preview.transport,
          diet: preview.diet,
          electricity: preview.electricity,
          shopping: preview.shopping,
          flights: preview.flights,
        },
        inputs: input,
        topActions: ['Reduce your biggest emission category', 'Try one green action this week'],
      };
      setLatestFootprint(record);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
        {/* Transport */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            🚗 <span>Transport</span>
            <span className="badge-pill bg-red-100 text-red-600 ml-auto text-xs">Required</span>
          </h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">How do you usually travel?</label>
            <div className="grid grid-cols-5 gap-2">
              {TRANSPORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={form.transport?.mode === opt.value}
                  aria-label={`Select transport mode: ${opt.label}`}
                  onClick={() => set({ transport: { ...form.transport, mode: opt.value, kmPerWeek: form.transport?.kmPerWeek ?? 0 } })}
                  className={`flex flex-col items-center gap-1 py-3 rounded-xl border-2 text-xs font-semibold transition-all ${
                    form.transport?.mode === opt.value
                      ? 'border-primary bg-primary-light text-primary-dark shadow-sm'
                      : 'border-gray-200 text-gray-500 hover:border-primary hover:bg-primary-light'
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="transport-km-input" className="block text-sm font-semibold text-gray-700 mb-2">
              Weekly travel distance (km/week)
            </label>
            <input
              id="transport-km-input"
              type="number"
              min={0}
              max={5000}
              placeholder="e.g. 120"
              value={form.transport?.kmPerWeek ?? ''}
              onChange={(e) =>
                set({ transport: { mode: form.transport?.mode ?? 'car', kmPerWeek: Number(e.target.value) } })
              }
              className="input-field"
            />
          </div>
        </div>

        {/* Diet */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            🥗 <span>Diet</span>
            <span className="badge-pill bg-red-100 text-red-600 ml-auto text-xs">Required</span>
          </h2>
          <label className="block text-sm font-semibold text-gray-700 mb-2">How would you describe your diet?</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DIET_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={form.diet === opt.value}
                aria-label={`Select diet: ${opt.label}, emitting ${opt.sub}`}
                onClick={() => set({ diet: opt.value })}
                className={`flex flex-col items-center gap-2 py-4 px-2 rounded-xl border-2 text-sm transition-all ${
                  form.diet === opt.value
                    ? 'border-primary bg-primary-light text-primary-dark shadow-sm'
                    : 'border-gray-200 text-gray-500 hover:border-primary hover:bg-primary-light'
                }`}
              >
                <span className="text-3xl">{opt.icon}</span>
                <span className="font-semibold">{opt.label}</span>
                <span className="text-xs opacity-60">{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Electricity */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            ⚡ <span>Electricity</span>
            <span className="badge-pill bg-red-100 text-red-600 ml-auto text-xs">Required</span>
          </h2>
          <div>
            <label htmlFor="electricity-input" className="block text-sm font-semibold text-gray-700 mb-2">
              Monthly electricity usage (kWh/month)
            </label>
            <input
              id="electricity-input"
              type="number"
              min={0}
              max={5000}
              placeholder="e.g. 180"
              value={form.electricityKwhPerMonth ?? ''}
              onChange={(e) => set({ electricityKwhPerMonth: Number(e.target.value) })}
              className="input-field"
            />
            <p className="text-xs text-gray-400 mt-1">Check your electricity bill or estimate ~150–300 kWh for a typical household</p>
          </div>
        </div>

        {/* Shopping */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            🛍️ <span>Shopping</span>
            <span className="badge-pill bg-red-100 text-red-600 ml-auto text-xs">Required</span>
          </h2>
          <label className="block text-sm font-semibold text-gray-700 mb-2">How much do you shop for non-essentials?</label>
          <div className="grid grid-cols-3 gap-3">
            {SHOPPING_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={form.shoppingLevel === opt.value}
                aria-label={`Select shopping level: ${opt.label}, ${opt.sub}`}
                onClick={() => set({ shoppingLevel: opt.value })}
                className={`flex flex-col items-center gap-1 py-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                  form.shoppingLevel === opt.value
                    ? 'border-primary bg-primary-light text-primary-dark shadow-sm'
                    : 'border-gray-200 text-gray-500 hover:border-primary hover:bg-primary-light'
                }`}
              >
                <span className="font-bold text-base">{opt.label}</span>
                <span className="text-xs font-normal opacity-60">{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Optional fields */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-lg">✈️ Additional (Optional)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="flight-km-input" className="block text-sm font-semibold text-gray-700 mb-2">
                Flight distance (km/month)
              </label>
              <input
                id="flight-km-input"
                type="number"
                min={0}
                placeholder="e.g. 500"
                value={form.flightKmPerMonth ?? ''}
                onChange={(e) => set({ flightKmPerMonth: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="household-size-input" className="block text-sm font-semibold text-gray-700 mb-2">
                Household size (people)
              </label>
              <input
                id="household-size-input"
                type="number"
                min={1}
                max={20}
                placeholder="e.g. 1"
                value={form.householdSize ?? ''}
                onChange={(e) => set({ householdSize: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1 py-4 text-base disabled:opacity-60"
          >
            {loading ? (
              <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Calculating…</>
            ) : (
              '🌍 Calculate My Footprint'
            )}
          </button>
          <button
            type="button"
            onClick={handleDemoFill}
            className="btn-ghost border-2 border-dashed border-gray-300 flex-1 py-4 text-base"
          >
            ⚡ Load Demo Data Instead
          </button>
        </div>
      </form>

      {/* Live preview */}
      <div className="lg:col-span-1 sticky top-24">
        <CarbonPreview input={form} />
      </div>
    </div>
  );
}
