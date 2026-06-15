export const simulateWhatIf = (
  currentWeeklyEmissions: number,
  swaps: {
    transportSavedKg: number;
    mealSavedKg: number;
    energySavedKg: number;
    shoppingSavedKg: number;
  }
) => {
  const totalWeeklySaved = 
    swaps.transportSavedKg + 
    swaps.mealSavedKg + 
    swaps.energySavedKg + 
    swaps.shoppingSavedKg;

  const monthlySaved = totalWeeklySaved * 4;
  const yearlySaved = totalWeeklySaved * 52;
  
  // Mock conversion for money saved (e.g. 1 kg CO2e saved ~ $0.5 saved)
  const moneySavedWeekly = totalWeeklySaved * 0.5;

  return {
    weeklyCO2Saved: totalWeeklySaved,
    monthlyCO2Saved: monthlySaved,
    yearlyCO2Saved: yearlySaved,
    moneySaved: moneySavedWeekly,
    newProjectedWeeklyEmissions: Math.max(0, currentWeeklyEmissions - totalWeeklySaved)
  };
};
