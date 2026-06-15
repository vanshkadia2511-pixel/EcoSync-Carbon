import { create } from 'zustand';
import { User, Activity, Recommendation, Challenge, LeaderboardUser } from '../types';

export interface AppState {
  user: User | null;
  activities: Activity[];
  recommendations: Recommendation[];
  challenges: Challenge[];
  leaderboard: LeaderboardUser[];
  
  setUser: (user: User | null) => void;
  updateEcoScore: (score: number) => void;
  addActivity: (activity: Activity) => void;
  addSeeds: (seeds: number) => void;
  updateWeeklyBudget: (budgetKg: number) => void;
  setRecommendations: (recommendations: Recommendation[]) => void;
  setChallenges: (challenges: Challenge[]) => void;
  updateChallengeProgress: (challengeId: string, progress: number) => void;
  setLeaderboard: (leaderboard: LeaderboardUser[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  activities: [],
  recommendations: [],
  challenges: [],
  leaderboard: [],

  setUser: (user) => set({ user }),
  
  updateEcoScore: (score) => 
    set((state) => ({ user: state.user ? { ...state.user, ecoScore: score } : null })),
    
  addActivity: (activity) => 
    set((state) => ({ activities: [activity, ...state.activities] })),
    
  addSeeds: (seeds) => 
    set((state) => ({ user: state.user ? { ...state.user, seeds: state.user.seeds + seeds } : null })),
    
  updateWeeklyBudget: (budgetKg) => 
    set((state) => ({ user: state.user ? { ...state.user, weeklyBudgetKg: budgetKg } : null })),
    
  setRecommendations: (recommendations) => set({ recommendations }),
  
  setChallenges: (challenges) => set({ challenges }),
  
  updateChallengeProgress: (challengeId, progress) => 
    set((state) => ({
      challenges: state.challenges.map((c) => 
        c.id === challengeId ? { ...c, progress } : c
      )
    })),
    
  setLeaderboard: (leaderboard) => set({ leaderboard }),
}));
