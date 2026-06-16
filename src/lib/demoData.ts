import { User, Activity, Challenge, LeaderboardUser, Recommendation } from '../types';

export const demoUser: User = {
  id: 'demo_aarav_123',
  displayName: 'Aarav',
  email: 'aarav.demo@ecotrack.app',
  ecoScore: 68,
  weeklyBudgetKg: 40,
  currentStreak: 7,
  seeds: 1250,
  level: 2,
  onboardingCompleted: true
};

export const demoActivities: Activity[] = [
  { id: 'act_1', category: 'Transport', type: 'car', value: 15, unit: 'km', emissionKg: 2.7, createdAt: new Date(Date.now() - 86400000 * 1).toISOString() },
  { id: 'act_2', category: 'Food', type: 'meat_heavy_meal', value: 1, unit: 'meal', emissionKg: 6.0, createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'act_3', category: 'Energy', type: 'electricity', value: 5, unit: 'kWh', emissionKg: 3.5, createdAt: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 'act_4', category: 'Transport', type: 'bus', value: 10, unit: 'km', emissionKg: 0.8, createdAt: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: 'act_5', category: 'Shopping', type: 'medium_purchase', value: 1, unit: 'item', emissionKg: 8.0, createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: 'act_6', category: 'Transport', type: 'car', value: 20, unit: 'km', emissionKg: 3.6, createdAt: new Date(Date.now() - 86400000 * 6).toISOString() },
  { id: 'act_7', category: 'Food', type: 'vegetarian_meal', value: 1, unit: 'meal', emissionKg: 1.5, createdAt: new Date(Date.now() - 86400000 * 7).toISOString() },
];

export const demoLeaderboard: LeaderboardUser[] = [
  { id: 'user_1', rank: 1, displayName: 'Priya', seeds: 3400, co2SavedKg: 45.2, badge: '🏆 Planet Guardian' },
  { id: 'demo_aarav_123', rank: 2, displayName: 'Aarav (You)', seeds: 1250, co2SavedKg: 18.5, badge: '🌱 Eco Explorer' },
  { id: 'user_3', rank: 3, displayName: 'Rohan', seeds: 980, co2SavedKg: 12.0, badge: '🌿 New Sprout' },
  { id: 'user_4', rank: 4, displayName: 'Sneha', seeds: 850, co2SavedKg: 9.5, badge: '🌿 New Sprout' },
  { id: 'user_5', rank: 5, displayName: 'Kabir', seeds: 420, co2SavedKg: 4.1, badge: '🌱 Seedling' },
];

export const demoChallenges: Challenge[] = [
  { id: 'chal_1', title: 'Public Transport Week', category: 'Transport', target: 5, progress: 3, rewardSeeds: 200, estimatedSavingKg: 15, status: 'Active' },
  { id: 'chal_2', title: '2 Plant-Based Meals', category: 'Food', target: 2, progress: 0, rewardSeeds: 50, estimatedSavingKg: 8, status: 'Available' },
  { id: 'chal_3', title: 'No Plastic Bottle Day', category: 'Waste', target: 1, progress: 1, rewardSeeds: 50, estimatedSavingKg: 0.1, status: 'Completed' },
];

export const demoRecommendations: Recommendation[] = [
  { id: 'rec_1', title: 'Swap 2 car trips for biking', category: 'Transport', description: 'Transport is your biggest source. Try biking twice this week to save around 5.4 kg CO2e.', estimatedSavingKg: 5.4, difficulty: 'Medium', moneySaving: 8.0, status: 'Pending' },
  { id: 'rec_2', title: 'Switch off unused appliances', category: 'Energy', description: 'Unplugging devices can save up to 2.5 kg CO2e this week.', estimatedSavingKg: 2.5, difficulty: 'Easy', moneySaving: 3.5, status: 'Pending' }
];

export const injectDemoData = (store: import('../store/useAppStore').AppState) => {
  store.setUser(demoUser);
  demoActivities.forEach(act => store.addActivity(act));
  store.setChallenges(demoChallenges);
  store.setLeaderboard(demoLeaderboard);
  store.setRecommendations(demoRecommendations);
};
