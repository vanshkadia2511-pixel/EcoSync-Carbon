export const calculateEcoScore = (
  weeklyEmissions: number,
  weeklyBudget: number,
  streakBonus: number = 0,
  challengeBonus: number = 0,
  lowCarbonActivityBonus: number = 0
) => {
  const penalty = (weeklyEmissions / weeklyBudget) * 40;
  const bonus = streakBonus + challengeBonus + lowCarbonActivityBonus;
  
  const score = 100 - penalty + bonus;
  
  // Clamp between 0 and 100
  return Math.max(0, Math.min(100, Math.round(score)));
};
