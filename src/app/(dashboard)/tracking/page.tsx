'use client';

import TravelDetectorMock from '@/components/tracking/TravelDetectorMock';
import SpendingCarbonMock from '@/components/tracking/SpendingCarbonMock';
import OffsetPaymentMock from '@/components/tracking/OffsetPaymentMock';
import { useState } from 'react';

const TABS = [
  { id: 'travel', label: '📍 Travel Detector', component: TravelDetectorMock },
  { id: 'spending', label: '💳 Spending Carbon', component: SpendingCarbonMock },
  { id: 'offset', label: '🌍 Carbon Offset', component: OffsetPaymentMock },
];

export default function TrackingPage() {
  const [activeTab, setActiveTab] = useState('travel');
  const ActiveComponent = TABS.find(t => t.id === activeTab)!.component;

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      <header>
        <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-2">Passive Tracking</h1>
        <p className="text-[var(--color-on-surface-variant)] text-lg">
          Automatically detect, categorize, and offset your carbon footprint.
        </p>
      </header>

      {/* Info Banner */}
      <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
        <span className="text-xl">⚡</span>
        <div>
          <p className="font-semibold">Demo Mode Active</p>
          <p className="text-amber-700">These modules show simulated data. Real integrations (location, banking, payments) would be connected in the full production version.</p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-2 bg-[var(--color-surface-container-low)] p-1.5 rounded-2xl">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-[var(--color-primary)] shadow-sm'
                : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Component */}
      <ActiveComponent />
    </div>
  );
}
