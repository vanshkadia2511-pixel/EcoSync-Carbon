import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '@/store/useAppStore';
import type { User, Activity, Challenge } from '@/types';

const mockUser: User = {
  id: 'user_test_001',
  displayName: 'Test User',
  email: 'test@example.com',
  ecoScore: 75,
  weeklyBudgetKg: 40,
  currentStreak: 3,
  seeds: 500,
  level: 2,
  onboardingCompleted: true,
};

const mockActivity: Activity = {
  id: 'act_001',
  category: 'Transport',
  type: 'car',
  value: 20,
  unit: 'km',
  emissionKg: 3.6,
  createdAt: new Date().toISOString(),
};


const mockChallenge: Challenge = {
  id: 'chal_001',
  title: 'Zero Waste Week',
  category: 'General',
  target: 7,
  progress: 0,
  rewardSeeds: 200,
  estimatedSavingKg: 10,
  status: 'Available',
};

describe('useAppStore - User Management', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAppStore.setState({
      user: null,
      activities: [],
      recommendations: [],
      challenges: [],
      leaderboard: [],
      region: 'Global',
    });
  });

  it('initializes with null user', () => {
    const { user } = useAppStore.getState();
    expect(user).toBeNull();
  });

  it('sets user correctly', () => {
    useAppStore.getState().setUser(mockUser);
    const { user } = useAppStore.getState();
    expect(user).toEqual(mockUser);
    expect(user?.displayName).toBe('Test User');
  });

  it('clears user when setUser is called with null', () => {
    useAppStore.getState().setUser(mockUser);
    useAppStore.getState().setUser(null);
    expect(useAppStore.getState().user).toBeNull();
  });

  it('updates eco score correctly', () => {
    useAppStore.getState().setUser(mockUser);
    useAppStore.getState().updateEcoScore(90);
    expect(useAppStore.getState().user?.ecoScore).toBe(90);
  });

  it('does not crash updateEcoScore when user is null', () => {
    expect(() => useAppStore.getState().updateEcoScore(90)).not.toThrow();
    expect(useAppStore.getState().user).toBeNull();
  });

  it('adds seeds to existing user seeds', () => {
    useAppStore.getState().setUser(mockUser);
    useAppStore.getState().addSeeds(100);
    expect(useAppStore.getState().user?.seeds).toBe(600); // 500 + 100
  });

  it('does not add seeds when user is null', () => {
    expect(() => useAppStore.getState().addSeeds(100)).not.toThrow();
    expect(useAppStore.getState().user).toBeNull();
  });

  it('updates weekly budget', () => {
    useAppStore.getState().setUser(mockUser);
    useAppStore.getState().updateWeeklyBudget(60);
    expect(useAppStore.getState().user?.weeklyBudgetKg).toBe(60);
  });
});

describe('useAppStore - Activity Log', () => {
  beforeEach(() => {
    useAppStore.setState({ activities: [], user: mockUser });
  });

  it('initializes with empty activities', () => {
    useAppStore.setState({ activities: [] });
    expect(useAppStore.getState().activities).toHaveLength(0);
  });

  it('adds an activity to the log', () => {
    useAppStore.getState().addActivity(mockActivity);
    expect(useAppStore.getState().activities).toHaveLength(1);
    expect(useAppStore.getState().activities[0]).toEqual(mockActivity);
  });

  it('prepends new activities (newest first)', () => {
    const act1 = { ...mockActivity, id: 'act_1' };
    const act2 = { ...mockActivity, id: 'act_2' };
    useAppStore.getState().addActivity(act1);
    useAppStore.getState().addActivity(act2);
    const { activities } = useAppStore.getState();
    expect(activities[0].id).toBe('act_2'); // Most recent first
    expect(activities[1].id).toBe('act_1');
  });

  it('stores multiple activities', () => {
    for (let i = 0; i < 5; i++) {
      useAppStore.getState().addActivity({ ...mockActivity, id: `act_${i}` });
    }
    expect(useAppStore.getState().activities).toHaveLength(5);
  });
});

describe('useAppStore - Challenges', () => {
  beforeEach(() => {
    useAppStore.setState({ challenges: [] });
  });

  it('initializes with empty challenges', () => {
    expect(useAppStore.getState().challenges).toHaveLength(0);
  });

  it('sets challenges correctly', () => {
    useAppStore.getState().setChallenges([mockChallenge]);
    expect(useAppStore.getState().challenges).toHaveLength(1);
    expect(useAppStore.getState().challenges[0].title).toBe('Zero Waste Week');
  });

  it('updates challenge progress by ID', () => {
    useAppStore.getState().setChallenges([mockChallenge]);
    useAppStore.getState().updateChallengeProgress('chal_001', 5);
    const updated = useAppStore.getState().challenges.find((c) => c.id === 'chal_001');
    expect(updated?.progress).toBe(5);
  });

  it('does not affect other challenges when updating progress', () => {
    const chal2 = { ...mockChallenge, id: 'chal_002', title: 'Other Challenge' };
    useAppStore.getState().setChallenges([mockChallenge, chal2]);
    useAppStore.getState().updateChallengeProgress('chal_001', 3);
    const chal2State = useAppStore.getState().challenges.find((c) => c.id === 'chal_002');
    expect(chal2State?.progress).toBe(0); // Unchanged
  });

  it('replaces all challenges when setChallenges is called', () => {
    useAppStore.getState().setChallenges([mockChallenge]);
    const newChallenge = { ...mockChallenge, id: 'chal_new', title: 'New Challenge' };
    useAppStore.getState().setChallenges([newChallenge]);
    expect(useAppStore.getState().challenges).toHaveLength(1);
    expect(useAppStore.getState().challenges[0].id).toBe('chal_new');
  });
});

describe('useAppStore - Region', () => {
  it('defaults to Global region', () => {
    useAppStore.setState({ region: 'Global' });
    expect(useAppStore.getState().region).toBe('Global');
  });

  it('updates region correctly', () => {
    useAppStore.getState().setRegion('Asia');
    expect(useAppStore.getState().region).toBe('Asia');
  });

  it('can set any valid region', () => {
    const regions = ['Global', 'Asia', 'US', 'EU', 'UK'] as const;
    for (const r of regions) {
      useAppStore.getState().setRegion(r);
      expect(useAppStore.getState().region).toBe(r);
    }
  });
});
