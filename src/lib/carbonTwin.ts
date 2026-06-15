import { calculateEcoScore } from './calculateEcoScore';
import { simulateWhatIf } from './whatIfSimulator';

export const generateCarbonTwin = (
  currentWeeklyEmissions: number,
  weeklyBudget: number,
  biggestSource: string,
  proposedSwaps: {
    transportSavedKg: number;
    mealSavedKg: number;
    energySavedKg: number;
    shoppingSavedKg: number;
  }
) => {
  const currentEcoScore = calculateEcoScore(currentWeeklyEmissions, weeklyBudget);
  const currentMonthlyProjected = currentWeeklyEmissions * 4;

  const simulated = simulateWhatIf(currentWeeklyEmissions, proposedSwaps);
  const greenerEcoScore = calculateEcoScore(simulated.newProjectedWeeklyEmissions, weeklyBudget);

  return {
    currentMe: {
      weeklyEmissions: currentWeeklyEmissions,
      ecoScore: currentEcoScore,
      biggestSource,
      projectedMonthlyFootprint: currentMonthlyProjected
    },
    greenerMe: {
      projectedWeeklyEmissions: simulated.newProjectedWeeklyEmissions,
      improvedEcoScore: greenerEcoScore,
      co2SavedWeekly: simulated.weeklyCO2Saved,
      moneySavedWeekly: simulated.moneySaved,
      newBadgeUnlocked: simulated.weeklyCO2Saved > 10 ? 'Green Future' : null
    }
  };
};
