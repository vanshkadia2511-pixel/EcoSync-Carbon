'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Activity } from '@/types';
import { calculateTransportEmission } from '@/lib/calculateEmission';

const DETECTED_TRIPS = [
  { id: 'trip_1', icon: '🚗', mode: 'car', label: 'Car trip', distance: 12, time: '8:32 AM', from: 'Home', to: 'Office' },
  { id: 'trip_2', icon: '🚌', mode: 'bus', label: 'Bus ride', distance: 7, time: '6:15 PM', from: 'Office', to: 'Mall' },
  { id: 'trip_3', icon: '🚆', mode: 'train', label: 'Metro trip', distance: 18, time: '9:05 AM', from: 'Station A', to: 'Station C' },
];

export default function TravelDetectorMock() {
  const [trips, setTrips] = useState(DETECTED_TRIPS.map(t => ({ ...t, status: 'pending' as 'pending' | 'confirmed' | 'dismissed' })));
  const addActivity = useAppStore(state => state.addActivity);
  const addSeeds = useAppStore(state => state.addSeeds);

  const handleConfirm = (tripId: string) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    const emissionKg = calculateTransportEmission(trip.mode as any, trip.distance);
    const activity: Activity = {
      id: `auto_${tripId}`,
      category: 'Transport',
      type: trip.mode,
      value: trip.distance,
      unit: 'km',
      emissionKg,
      createdAt: new Date().toISOString(),
    };

    addActivity(activity);
    addSeeds(15); // bonus for confirming auto-detected trip
    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, status: 'confirmed' } : t));
  };

  const handleDismiss = (tripId: string) => {
    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, status: 'dismissed' } : t));
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-[var(--color-surface-container)] shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">📍</div>
        <div>
          <h3 className="font-bold text-[var(--color-on-surface)]">Travel Detector</h3>
          <p className="text-sm text-[var(--color-on-surface-variant)]">Today's detected trips — confirm to log</p>
        </div>
        <span className="ml-auto bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">MOCK</span>
      </div>

      <div className="space-y-3">
        {trips.map(trip => (
          <div
            key={trip.id}
            className={`rounded-2xl p-4 border-2 transition-all ${
              trip.status === 'confirmed' ? 'border-[var(--color-secondary)] bg-[var(--color-secondary-container)]/30 opacity-70' :
              trip.status === 'dismissed' ? 'border-[var(--color-surface-container)] opacity-40' :
              'border-[var(--color-surface-container)] hover:border-[var(--color-primary)]/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{trip.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-sm text-[var(--color-on-surface)]">
                  {trip.label} · {trip.distance} km
                </p>
                <p className="text-xs text-[var(--color-outline)]">
                  {trip.time} · {trip.from} → {trip.to}
                </p>
              </div>
              <div className="text-right text-xs font-semibold text-[var(--color-primary)]">
                {calculateTransportEmission(trip.mode as any, trip.distance).toFixed(1)} kg CO₂
              </div>
            </div>

            {trip.status === 'pending' && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleConfirm(trip.id)}
                  className="flex-1 bg-[var(--color-secondary)] text-white text-sm py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  ✓ Confirm
                </button>
                <button
                  onClick={() => handleDismiss(trip.id)}
                  className="flex-1 bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] text-sm py-2 rounded-xl font-semibold hover:bg-[var(--color-surface-container)] transition-colors"
                >
                  ✕ Dismiss
                </button>
              </div>
            )}

            {trip.status === 'confirmed' && (
              <p className="mt-2 text-xs font-semibold text-[var(--color-secondary)]">✓ Logged · +15 Seeds earned</p>
            )}

            {trip.status === 'dismissed' && (
              <p className="mt-2 text-xs text-[var(--color-outline)]">Dismissed</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
