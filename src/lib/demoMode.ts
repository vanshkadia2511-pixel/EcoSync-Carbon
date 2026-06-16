import { User, Activity, Challenge, Recommendation, LeaderboardUser } from '../types';

// ─── Demo User: "Aarav" ───────────────────────────────────────────────────────
export const DEMO_USER: User = {
  id: 'demo_aarav_001',
  displayName: 'Aarav Shah',
  email: 'aarav@ecotrack.demo',
  ecoScore: 74,
  weeklyBudgetKg: 50,
  currentStreak: 7,
  seeds: 1240,
  level: 5,
  onboardingCompleted: true,
};

// ─── 7 days of activities ─────────────────────────────────────────────────────
const today = new Date();
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

export const DEMO_ACTIVITIES: Activity[] = [
  // Day 0 – today
  { id: 'act_01', category: 'Transport', type: 'bus',   value: 12, unit: 'km', emissionKg: 0.96, createdAt: daysAgo(0) },
  { id: 'act_02', category: 'Food',      type: 'vegetarian_meal', value: 1, unit: 'meal', emissionKg: 1.5, createdAt: daysAgo(0) },
  // Day 1
  { id: 'act_03', category: 'Transport', type: 'car',   value: 20, unit: 'km', emissionKg: 3.6,  createdAt: daysAgo(1) },
  { id: 'act_04', category: 'Energy',    type: 'electricity', value: 5, unit: 'kWh', emissionKg: 3.5, createdAt: daysAgo(1) },
  // Day 2
  { id: 'act_05', category: 'Transport', type: 'train', value: 30, unit: 'km', emissionKg: 1.2,  createdAt: daysAgo(2) },
  { id: 'act_06', category: 'Food',      type: 'plant_based_meal', value: 2, unit: 'meal', emissionKg: 1.4, createdAt: daysAgo(2) },
  { id: 'act_07', category: 'Shopping',  type: 'small_purchase', value: 1, unit: 'item', emissionKg: 2.0, createdAt: daysAgo(2) },
  // Day 3
  { id: 'act_08', category: 'Transport', type: 'bike',  value: 8,  unit: 'km', emissionKg: 0,    createdAt: daysAgo(3) },
  { id: 'act_09', category: 'Food',      type: 'chicken_meal', value: 1, unit: 'meal', emissionKg: 3.0, createdAt: daysAgo(3) },
  // Day 4
  { id: 'act_10', category: 'Transport', type: 'car',   value: 35, unit: 'km', emissionKg: 6.3,  createdAt: daysAgo(4) },
  { id: 'act_11', category: 'Energy',    type: 'electricity', value: 8, unit: 'kWh', emissionKg: 5.6, createdAt: daysAgo(4) },
  // Day 5
  { id: 'act_12', category: 'Transport', type: 'bus',   value: 15, unit: 'km', emissionKg: 1.2,  createdAt: daysAgo(5) },
  { id: 'act_13', category: 'Waste',     type: 'recycled_item', value: 3, unit: 'items', emissionKg: -0.6, createdAt: daysAgo(5) },
  // Day 6
  { id: 'act_14', category: 'Transport', type: 'walk',  value: 4,  unit: 'km', emissionKg: 0,    createdAt: daysAgo(6) },
  { id: 'act_15', category: 'Food',      type: 'vegetarian_meal', value: 2, unit: 'meal', emissionKg: 3.0, createdAt: daysAgo(6) },
];

// ─── Challenges ───────────────────────────────────────────────────────────────
export const DEMO_CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    title: 'Public Transport Week',
    category: 'Transport',
    target: 5,
    progress: 4,
    rewardSeeds: 200,
    estimatedSavingKg: 12.0,
    status: 'Active',
  },
  {
    id: 'ch_02',
    title: 'Meatless Monday',
    category: 'Food',
    target: 4,
    progress: 4,
    rewardSeeds: 150,
    estimatedSavingKg: 8.0,
    status: 'Completed',
  },
  {
    id: 'ch_03',
    title: '7-Day Streak',
    category: 'General',
    target: 7,
    progress: 7,
    rewardSeeds: 300,
    estimatedSavingKg: 5.0,
    status: 'Completed',
  },
  {
    id: 'ch_04',
    title: 'Zero Car Week',
    category: 'Transport',
    target: 5,
    progress: 2,
    rewardSeeds: 400,
    estimatedSavingKg: 18.0,
    status: 'Active',
  },
  {
    id: 'ch_05',
    title: 'Energy Saver',
    category: 'Energy',
    target: 7,
    progress: 3,
    rewardSeeds: 250,
    estimatedSavingKg: 10.0,
    status: 'Active',
  },
];

// ─── Recommendations ──────────────────────────────────────────────────────────
export const DEMO_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec_01',
    title: 'Switch Day 4 Car Trip to Metro',
    category: 'Transport',
    description: 'Your 35 km car trip on Thursday generated 6.3 kg CO₂. Taking the metro instead would emit just 1.4 kg — saving nearly 5 kg in a single commute.',
    estimatedSavingKg: 4.9,
    difficulty: 'Medium',
    moneySaving: 85,
    status: 'Pending',
  },
  {
    id: 'rec_02',
    title: 'Try 2 Plant-Based Meals This Week',
    category: 'Food',
    description: 'Swapping just 2 chicken/meat meals for plant-based options saves ~5 kg CO₂ and ₹120 in groceries on average.',
    estimatedSavingKg: 5.2,
    difficulty: 'Easy',
    moneySaving: 120,
    status: 'Pending',
  },
  {
    id: 'rec_03',
    title: 'Reduce Peak Hour Electricity Use',
    category: 'Energy',
    description: 'Running heavy appliances before 6 PM reduces grid carbon intensity by up to 20% in your region.',
    estimatedSavingKg: 2.1,
    difficulty: 'Easy',
    moneySaving: 40,
    status: 'Accepted',
  },
];

// ─── Leaderboard ──────────────────────────────────────────────────────────────
export const DEMO_LEADERBOARD: LeaderboardUser[] = [
  { id: 'u_01', rank: 1, displayName: 'Priya M.',   seeds: 1890, co2SavedKg: 28.4, badge: '🥇' },
  { id: 'u_02', rank: 2, displayName: 'Rahul K.',   seeds: 1540, co2SavedKg: 22.1, badge: '🥈' },
  { id: 'u_03', rank: 3, displayName: 'Nisha T.',   seeds: 1430, co2SavedKg: 19.8, badge: '🥉' },
  { id: 'u_04', rank: 4, displayName: 'Aarav Shah', seeds: 1240, co2SavedKg: 16.3, badge: '🌿' },
  { id: 'u_05', rank: 5, displayName: 'Kabir V.',   seeds: 1100, co2SavedKg: 14.7, badge: '🌱' },
  { id: 'u_06', rank: 6, displayName: 'Ananya R.',  seeds: 980,  co2SavedKg: 12.2, badge: '🌱' },
  { id: 'u_07', rank: 7, displayName: 'Dev P.',     seeds: 870,  co2SavedKg: 10.5, badge: '🌱' },
  { id: 'u_08', rank: 8, displayName: 'Meera S.',   seeds: 750,  co2SavedKg: 9.1,  badge: '🌱' },
];
