import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FootprintRecord, ChallengeRecord, Badge, ChatMessage } from '../types/carbon';
import { DEMO_FOOTPRINT, DEMO_HISTORY, DEMO_CHALLENGES, DEMO_SESSION_ID } from '../lib/demoData';

interface EcoStore {
  // Session
  sessionId: string;
  isDemoMode: boolean;

  // Footprint data
  latestFootprint: FootprintRecord | null;
  history: FootprintRecord[];

  // Gamification
  seeds: number;
  badges: Badge[];
  challenges: ChallengeRecord[];

  // Coach chat
  chatHistory: ChatMessage[];

  // Actions
  setSessionId: (id: string) => void;
  activateDemoMode: () => void;
  resetDemoMode: () => void;
  setLatestFootprint: (record: FootprintRecord) => void;
  addToHistory: (record: FootprintRecord) => void;
  addSeeds: (amount: number) => void;
  unlockBadge: (id: string) => void;
  setChallenges: (challenges: ChallengeRecord[]) => void;
  updateChallengeProgress: (challengeId: string, progress: number) => void;
  addChatMessage: (msg: ChatMessage) => void;
  clearChatHistory: () => void;
}

const DEFAULT_BADGES: Badge[] = [
  { id: 'transit_hero', name: 'Transit Hero', icon: '🚌', description: 'Complete a transport reduction challenge', unlocked: false },
  { id: 'energy_saver', name: 'Energy Saver', icon: '⚡', description: 'Complete an electricity-saving challenge', unlocked: false },
  { id: 'low_waste_week', name: 'Low Waste Week', icon: '♻️', description: 'Complete a shopping/waste challenge', unlocked: false },
  { id: 'plant_plate', name: 'Plant Plate Starter', icon: '🥗', description: 'Choose a plant-based action', unlocked: false },
  { id: 'consistency_champ', name: 'Consistency Champion', icon: '🏆', description: 'Complete 3 audits', unlocked: false },
  { id: 'climate_learner', name: 'Climate Learner', icon: '🎓', description: 'Finish the quiz', unlocked: false },
];

export const useEcoStore = create<EcoStore>()(
  persist(
    (set) => ({
      sessionId: `session_${Date.now()}`,
      isDemoMode: false,
      latestFootprint: null,
      history: [],
      seeds: 0,
      badges: DEFAULT_BADGES,
      challenges: [],
      chatHistory: [],

      setSessionId: (id) => set({ sessionId: id }),

      activateDemoMode: () =>
        set({
          isDemoMode: true,
          sessionId: DEMO_SESSION_ID,
          latestFootprint: DEMO_FOOTPRINT,
          history: DEMO_HISTORY,
          challenges: DEMO_CHALLENGES,
          seeds: 520,
        }),

      resetDemoMode: () =>
        set({
          isDemoMode: false,
          sessionId: `session_${Date.now()}`,
          latestFootprint: null,
          history: [],
          challenges: [],
          seeds: 0,
          chatHistory: [],
        }),

      setLatestFootprint: (record) =>
        set((state) => ({
          latestFootprint: record,
          history: [record, ...state.history.filter((h) => h.recordId !== record.recordId)],
        })),

      addToHistory: (record) =>
        set((state) => ({ history: [record, ...state.history] })),

      addSeeds: (amount) =>
        set((state) => ({ seeds: state.seeds + amount })),

      unlockBadge: (id) =>
        set((state) => ({
          badges: state.badges.map((b) => (b.id === id ? { ...b, unlocked: true } : b)),
        })),

      setChallenges: (challenges) => set({ challenges }),

      updateChallengeProgress: (challengeId, progress) =>
        set((state) => ({
          challenges: state.challenges.map((c) =>
            c.challengeId === challengeId ? { ...c, progress } : c
          ),
        })),

      addChatMessage: (msg) =>
        set((state) => ({ chatHistory: [...state.chatHistory, msg] })),

      clearChatHistory: () => set({ chatHistory: [] }),
    }),
    {
      name: 'ecotrack-store',
      partialize: (state) => ({
        sessionId: state.sessionId,
        isDemoMode: state.isDemoMode,
        latestFootprint: state.latestFootprint,
        history: state.history,
        seeds: state.seeds,
        badges: state.badges,
        challenges: state.challenges,
      }),
    }
  )
);
