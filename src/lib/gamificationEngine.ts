export const calculateSeeds = (action: string): number => {
  switch (action) {
    case 'LOG_ACTIVITY': return 10;
    case 'LOW_CARBON_TRANSPORT': return 25;
    case 'COMPLETE_DAILY_CHALLENGE': return 50;
    case 'COMPLETE_WEEKLY_CHALLENGE': return 200;
    case 'UNDER_BUDGET': return 300;
    case 'MAINTAIN_7_DAY_STREAK': return 150;
    case 'INVITE_FRIEND': return 100;
    default: return 0;
  }
};

export const getEcoLevel = (seeds: number): string => {
  if (seeds < 500) return 'Level 1: New Sprout';
  if (seeds < 1500) return 'Level 2: Eco Explorer';
  if (seeds < 3000) return 'Level 3: Carbon Cutter';
  if (seeds < 5000) return 'Level 4: Climate Champion';
  return 'Level 5: Planet Guardian';
};

// V2 Feature: Expanded Badges System
export const checkBadges = (
  activitiesCount: number,
  seeds: number,
  friendsInvited: number
): string[] => {
  const unlockedBadges: string[] = [];

  if (activitiesCount >= 10) unlockedBadges.push('Consistent Tracker');
  if (seeds >= 1000) unlockedBadges.push('Seed Hoarder');
  if (friendsInvited >= 1) unlockedBadges.push('Social Butterfly');
  if (friendsInvited >= 5) unlockedBadges.push('Eco Ambassador');

  return unlockedBadges;
};
