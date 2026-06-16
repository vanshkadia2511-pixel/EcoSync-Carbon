import { CarbonFactors } from './carbonFactors';

/**
 * Calculates monthly transport CO₂ emissions.
 * @param mode - Transport mode (walk, bike, bus, train, car, auto, flight)
 * @param distanceKm - Distance traveled in km
 * @returns CO₂ emission in kg
 */
export const calculateTransportEmission = (mode: keyof typeof CarbonFactors.transport, distanceKm: number): number => {
  return CarbonFactors.transport[mode] * distanceKm;
};

/**
 * Calculates CO₂ emissions for a meal type.
 * @param mealType - Type of meal (plant_based_meal, vegetarian_meal, chicken_meal, meat_heavy_meal)
 * @param count - Number of meals (default 1)
 * @returns CO₂ emission in kg
 */
export const calculateFoodEmission = (mealType: keyof typeof CarbonFactors.food, count: number = 1): number => {
  return CarbonFactors.food[mealType] * count;
};

/**
 * Calculates CO₂ emissions from electricity usage.
 * @param kwh - Electricity consumption in kWh
 * @returns CO₂ emission in kg (based on default global grid factor)
 */
export const calculateEnergyEmission = (kwh: number): number => {
  return CarbonFactors.energy.electricity * kwh;
};

/**
 * Calculates CO₂ emissions from a shopping purchase.
 * @param purchaseSize - Size of the purchase (small_purchase, medium_purchase, large_purchase)
 * @param count - Number of purchases (default 1)
 * @returns CO₂ emission in kg
 */
export const calculateShoppingEmission = (purchaseSize: keyof typeof CarbonFactors.shopping, count: number = 1): number => {
  return CarbonFactors.shopping[purchaseSize] * count;
};

/**
 * Calculates CO₂ impact from waste activities.
 * Recycling returns a negative value (carbon credit).
 * @param wasteType - Type of waste activity (recycled_item, plastic_bottle)
 * @param count - Number of waste events (default 1)
 * @returns CO₂ emission in kg (negative = carbon credit)
 */
export const calculateWasteEmission = (wasteType: keyof typeof CarbonFactors.waste, count: number = 1): number => {
  return CarbonFactors.waste[wasteType] * count;
};

/**
 * Returns the user's weekly carbon budget in kg CO₂.
 * @param baseValue - Base weekly budget in kg (default 50)
 * @returns Weekly budget in kg CO₂
 */
export const calculateWeeklyBudget = (baseValue: number = 50): number => {
  // Can be personalized based on onboarding quiz
  return baseValue;
};
