import { CarbonFactors } from './carbonFactors';

export const calculateTransportEmission = (mode: keyof typeof CarbonFactors.transport, distanceKm: number) => {
  return CarbonFactors.transport[mode] * distanceKm;
};

export const calculateFoodEmission = (mealType: keyof typeof CarbonFactors.food, count: number = 1) => {
  return CarbonFactors.food[mealType] * count;
};

export const calculateEnergyEmission = (kwh: number) => {
  return CarbonFactors.energy.electricity * kwh;
};

export const calculateShoppingEmission = (purchaseSize: keyof typeof CarbonFactors.shopping, count: number = 1) => {
  return CarbonFactors.shopping[purchaseSize] * count;
};

export const calculateWasteEmission = (wasteType: keyof typeof CarbonFactors.waste, count: number = 1) => {
  return CarbonFactors.waste[wasteType] * count;
};

export const calculateWeeklyBudget = (baseValue: number = 50) => {
  // Can be personalized based on onboarding quiz
  return baseValue;
};
