'use client';

import { useState } from 'react';

const MOCK_TRANSACTIONS = [
  { id: 'tx_1', merchant: 'Swiggy', category: 'Food Delivery', amount: 450, emissionKg: 3.2, icon: '🍔', date: 'Today, 1:30 PM' },
  { id: 'tx_2', merchant: 'Petrol Station', category: 'Fuel', amount: 1200, emissionKg: 2.8, icon: '⛽', date: 'Today, 9:10 AM' },
  { id: 'tx_3', merchant: 'Amazon', category: 'Online Shopping', amount: 3499, emissionKg: 8.0, icon: '📦', date: 'Yesterday' },
  { id: 'tx_4', merchant: 'Local Grocery', category: 'Groceries', amount: 580, emissionKg: 0.5, icon: '🛒', date: 'Yesterday' },
  { id: 'tx_5', merchant: 'Electricity Bill', category: 'Energy', amount: 1800, emissionKg: 12.6, icon: '⚡', date: 'Jun 12' },
];

const levelColor = (kg: number) => {
  if (kg < 1) return 'text-green-600 bg-green-50';
  if (kg < 5) return 'text-yellow-700 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

export default function SpendingCarbonMock() {
  const [selected, setSelected] = useState<string | null>(null);

  const total = MOCK_TRANSACTIONS.reduce((s, t) => s + t.emissionKg, 0);

  return (
    <div className="bg-white rounded-3xl p-6 border border-[var(--color-surface-container)] shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-xl">💳</div>
        <div>
          <h3 className="font-bold text-[var(--color-on-surface)]">Spending Carbon Tracker</h3>
          <p className="text-sm text-[var(--color-on-surface-variant)]">Your spending, decoded as carbon</p>
        </div>
        <span className="ml-auto bg-violet-100 text-violet-700 text-xs font-bold px-2 py-1 rounded-full">MOCK</span>
      </div>

      {/* Summary */}
      <div className="my-4 p-4 bg-[var(--color-surface-container-low)] rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--color-outline)] font-medium">This week's spend impact</p>
          <p className="text-3xl font-bold text-[var(--color-primary)]">{total.toFixed(1)} kg</p>
          <p className="text-xs text-[var(--color-on-surface-variant)]">CO₂ from linked transactions</p>
        </div>
        <div className="text-4xl">🌫️</div>
      </div>

      {/* Transactions */}
      <div className="space-y-2">
        {MOCK_TRANSACTIONS.map(tx => (
          <div
            key={tx.id}
            onClick={() => setSelected(selected === tx.id ? null : tx.id)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-surface-container-low)] cursor-pointer transition-colors"
          >
            <span className="text-xl w-8 text-center">{tx.icon}</span>
            <div className="flex-1">
              <p className="font-semibold text-sm text-[var(--color-on-surface)]">{tx.merchant}</p>
              <p className="text-xs text-[var(--color-outline)]">{tx.category} · ₹{tx.amount.toLocaleString()}</p>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${levelColor(tx.emissionKg)}`}>
              {tx.emissionKg.toFixed(1)} kg
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-center text-[var(--color-outline)]">
        🔗 Powered by mock bank data · Connect real account in settings
      </p>
    </div>
  );
}
