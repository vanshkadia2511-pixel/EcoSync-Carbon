'use client';

import { useState } from 'react';

const OFFSET_PROJECTS = [
  {
    id: 'proj_1',
    name: 'Sundarbans Mangrove Forest',
    location: 'West Bengal, India',
    icon: '🌳',
    pricePerKg: 0.8,
    rating: 4.8,
    certified: 'Gold Standard',
    description: 'Restoring 200 hectares of critical mangrove ecosystem that sequesters carbon and protects coastal communities.',
  },
  {
    id: 'proj_2',
    name: 'Solar Cooker Initiative',
    location: 'Rajasthan, India',
    icon: '☀️',
    pricePerKg: 0.5,
    rating: 4.6,
    certified: 'Verra VCS',
    description: 'Distributing solar cookers to rural families, replacing fossil fuel use and improving livelihoods.',
  },
  {
    id: 'proj_3',
    name: 'Wind Energy Farm',
    location: 'Tamil Nadu, India',
    icon: '🌬️',
    pricePerKg: 0.6,
    rating: 4.9,
    certified: 'Gold Standard',
    description: 'Community-owned wind energy project supplying clean power to 5,000 homes in rural Tamil Nadu.',
  },
];

export default function OffsetPaymentMock() {
  const [kgToOffset, setKgToOffset] = useState(10);
  const [selectedProject, setSelectedProject] = useState(OFFSET_PROJECTS[0].id);
  const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');

  const project = OFFSET_PROJECTS.find(p => p.id === selectedProject)!;
  const totalCost = (kgToOffset * project.pricePerKg).toFixed(2);

  if (step === 'success') {
    return (
      <div className="bg-white rounded-3xl p-8 border border-[var(--color-surface-container)] shadow-sm text-center">
        <div className="text-6xl mb-4">🌿</div>
        <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">Offset Complete!</h3>
        <p className="text-[var(--color-on-surface-variant)] mb-2">
          You've offset <strong>{kgToOffset} kg CO₂</strong> via {project.name}.
        </p>
        <p className="text-sm text-[var(--color-outline)]">Transaction ID: ECO-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
        <button
          onClick={() => setStep('select')}
          className="mt-6 px-6 py-3 bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] rounded-xl font-semibold text-sm hover:bg-[var(--color-surface-container)] transition-colors"
        >
          Offset More
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-[var(--color-surface-container)] shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">🌍</div>
        <div>
          <h3 className="font-bold text-[var(--color-on-surface)]">Carbon Offset</h3>
          <p className="text-sm text-[var(--color-on-surface-variant)]">Neutralize your remaining footprint</p>
        </div>
        <span className="ml-auto bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">MOCK</span>
      </div>

      {step === 'select' && (
        <>
          {/* Amount Slider */}
          <div className="mb-6">
            <label className="flex justify-between text-sm font-semibold text-[var(--color-on-surface-variant)] mb-2">
              <span>KG to offset</span>
              <span className="text-[var(--color-primary)] text-lg">{kgToOffset} kg</span>
            </label>
            <input
              type="range"
              min={1}
              max={100}
              value={kgToOffset}
              onChange={e => setKgToOffset(Number(e.target.value))}
              className="w-full accent-[var(--color-secondary)]"
            />
            <div className="flex justify-between text-xs text-[var(--color-outline)] mt-1">
              <span>1 kg</span><span>100 kg</span>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3 mb-6">
            {OFFSET_PROJECTS.map(proj => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedProject === proj.id
                    ? 'border-[var(--color-secondary)] bg-[var(--color-secondary-container)]/20'
                    : 'border-[var(--color-surface-container)] hover:border-[var(--color-outline)]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{proj.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-sm text-[var(--color-on-surface)]">{proj.name}</p>
                      <p className="text-xs font-bold text-[var(--color-primary)]">₹{proj.pricePerKg}/kg</p>
                    </div>
                    <p className="text-xs text-[var(--color-outline)]">{proj.location} · ⭐ {proj.rating} · {proj.certified}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep('confirm')}
            className="w-full bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Offset {kgToOffset} kg · ₹{totalCost}
          </button>
        </>
      )}

      {step === 'confirm' && (
        <div className="space-y-4">
          <div className="p-4 bg-[var(--color-surface-container-low)] rounded-2xl space-y-2">
            <div className="flex justify-between text-sm"><span className="text-[var(--color-outline)]">Project</span><span className="font-semibold">{project.name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-[var(--color-outline)]">CO₂ Offset</span><span className="font-semibold">{kgToOffset} kg</span></div>
            <div className="flex justify-between text-sm"><span className="text-[var(--color-outline)]">Amount</span><span className="font-bold text-[var(--color-primary)]">₹{totalCost}</span></div>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-800">
            💳 This is a mock payment. No real transaction will occur.
          </div>
          <button
            onClick={() => setStep('success')}
            className="w-full bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Confirm Mock Payment
          </button>
          <button
            onClick={() => setStep('select')}
            className="w-full text-[var(--color-outline)] text-sm py-2 font-medium hover:text-[var(--color-on-surface)] transition-colors"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
