export type ActivityCategory = 'Transport' | 'Food' | 'Energy' | 'Shopping' | 'Waste' | 'General';

export interface User {
  id: string;
  displayName: string;
  email: string;
  ecoScore: number;
  weeklyBudgetKg: number;
  currentStreak: number;
  seeds: number;
  level: number;
  onboardingCompleted: boolean;
}

export interface Activity {
  id: string;
  category: ActivityCategory;
  type: string;
  value: number;
  unit: string;
  emissionKg: number;
  createdAt: string;
}

export interface Recommendation {
  id: string;
  title: string;
  category: ActivityCategory;
  description: string;
  estimatedSavingKg: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  moneySaving: number;
  status: 'Pending' | 'Accepted' | 'Declined';
}

export interface Challenge {
  id: string;
  title: string;
  category: ActivityCategory | 'General';
  target: number;
  progress: number;
  rewardSeeds: number;
  estimatedSavingKg: number;
  status: 'Active' | 'Completed' | 'Available';
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  displayName: string;
  seeds: number;
  co2SavedKg: number;
  badge: string;
}
