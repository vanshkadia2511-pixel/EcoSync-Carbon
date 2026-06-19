// Demo data — EXACT values from README spec
import type { CarbonAuditInput, FootprintRecord, ChallengeRecord } from '../types/carbon';

export const DEMO_SESSION_ID = 'demo-user-123';

// Exact README sample input
export const DEMO_AUDIT_INPUT: CarbonAuditInput = {
  sessionId: DEMO_SESSION_ID,
  transport: { mode: 'car', kmPerWeek: 120 },
  diet: 'vegetarian',
  electricityKwhPerMonth: 180,
  shoppingLevel: 'medium',
  flightKmPerMonth: 0,
  householdSize: 1,
};

// Exact README calculated result
export const DEMO_FOOTPRINT: FootprintRecord = {
  recordId: 'demo_audit_001',
  sessionId: DEMO_SESSION_ID,
  createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  monthlyKgCO2e: 403.4,
  yearlyKgCO2e: 4840.8,
  score: 72,
  highestCategory: 'electricity',
  breakdown: {
    transport: 100.8,  // 120 × 0.21 × 4
    diet: 85,           // vegetarian baseline
    electricity: 147.6, // 180 × 0.82
    shopping: 70,       // medium baseline
    flights: 0,
  },
  inputs: DEMO_AUDIT_INPUT,
  topActions: [
    'Reduce electricity use by 10% this month',
    'Shift 2 commute days to public transport',
    'Choose one no-buy week for non-essential shopping',
  ],
};

// A second historical record to show progress
export const DEMO_HISTORY: FootprintRecord[] = [
  {
    ...DEMO_FOOTPRINT,
    recordId: 'demo_audit_000',
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    monthlyKgCO2e: 445.2,
    yearlyKgCO2e: 5342.4,
    score: 68,
  },
  DEMO_FOOTPRINT,
];

export const DEMO_CHALLENGES: ChallengeRecord[] = [
  {
    challengeId: 'ch_001',
    sessionId: DEMO_SESSION_ID,
    title: 'Public Transport Week',
    description: 'Use public transport instead of car for 5 days this week.',
    category: 'transport',
    estimatedImpactKg: 12.0,
    difficulty: 'medium',
    completed: false,
    rewardSeeds: 200,
    progress: 4,
    target: 5,
  },
  {
    challengeId: 'ch_002',
    sessionId: DEMO_SESSION_ID,
    title: 'Energy Saver Week',
    description: 'Reduce AC usage by 1 hour daily and switch off standby devices.',
    category: 'electricity',
    estimatedImpactKg: 8.0,
    difficulty: 'easy',
    completed: true,
    rewardSeeds: 150,
    progress: 7,
    target: 7,
  },
  {
    challengeId: 'ch_003',
    sessionId: DEMO_SESSION_ID,
    title: 'Meatless Monday Month',
    description: 'Choose plant-based meals every Monday for a month.',
    category: 'diet',
    estimatedImpactKg: 15.0,
    difficulty: 'easy',
    completed: false,
    rewardSeeds: 250,
    progress: 2,
    target: 4,
  },
];

export const DEMO_AI_REPLY = `Your biggest opportunity is electricity. This week, try switching off standby devices, reducing AC use by 1 hour per day, and using natural light during daytime. These actions are free and easy to start.`;

export const DEMO_AI_ACTIONS = [
  {
    title: 'Switch off standby devices',
    category: 'electricity' as const,
    impact: 'medium' as const,
    difficulty: 'easy' as const,
    estimatedKgCO2eSaved: 5,
    cost: 'free',
    timeframe: 'this week',
  },
  {
    title: 'Reduce AC usage by 1 hour per day',
    category: 'electricity' as const,
    impact: 'medium' as const,
    difficulty: 'easy' as const,
    estimatedKgCO2eSaved: 8,
    cost: 'free',
    timeframe: 'this week',
  },
  {
    title: 'Use natural light during daytime',
    category: 'electricity' as const,
    impact: 'low' as const,
    difficulty: 'easy' as const,
    estimatedKgCO2eSaved: 2,
    cost: 'free',
    timeframe: 'starting today',
  },
];
