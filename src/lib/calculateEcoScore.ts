/**
 * Calculates the Eco Score (0–100) based on weekly emissions vs budget,
 * with optional bonuses for streaks, challenges, and low-carbon activities.
 *
 * Formula: score = 100 - penalty + bonuses, clamped to [0, 100]
 * Penalty = (weeklyEmissions / weeklyBudget) * 40
 *
 * @param weeklyEmissions - Total weekly CO₂ emissions in kg
 * @param weeklyBudget - User's weekly carbon budget in kg
 * @param streakBonus - Bonus points for consecutive tracking streak (default 0)
 * @param challengeBonus - Bonus points for completed challenges (default 0)
 * @param lowCarbonActivityBonus - Bonus points for low-carbon activities (default 0)
 * @returns Integer eco score between 0 and 100
 */
export const calculateEcoScore = (
  weeklyEmissions: number,
  weeklyBudget: number,
  streakBonus: number = 0,
  challengeBonus: number = 0,
  lowCarbonActivityBonus: number = 0
): number => {
  const penalty = (weeklyEmissions / weeklyBudget) * 40;
  const bonus = streakBonus + challengeBonus + lowCarbonActivityBonus;
  
  const score = 100 - penalty + bonus;
  
  // Clamp between 0 and 100
  return Math.max(0, Math.min(100, Math.round(score)));
};
