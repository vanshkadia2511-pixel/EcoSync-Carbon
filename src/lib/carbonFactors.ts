/**
 * Carbon emission factors used throughout EcoTrack for CO₂e calculations.
 * Sources: EPA 2023, IPCC AR6, India CEA grid emission factor.
 * All values in kg CO₂e per unit unless otherwise noted.
 */
// Region-specific electricity emission factors (kg CO₂ per kWh)

export const ElectricityFactors: Record<string, number> = {
  Global: 0.70,
  Asia: 0.82,   // India / South Asia grid
  US: 0.39,     // US average (EPA 2023)
  EU: 0.25,     // EU average (cleaner grid)
  UK: 0.21,     // UK (high renewables)
};

export type Region = keyof typeof ElectricityFactors;

export const CarbonFactors = {
  transport: {
    walk: 0,
    bike: 0,
    bus: 0.08,
    train: 0.04,
    car: 0.18,
    auto: 0.10,
    flight: 0.25,
  },
  food: {
    plant_based_meal: 0.7,
    vegetarian_meal: 1.5,
    chicken_meal: 3.0,
    meat_heavy_meal: 6.0,
  },
  energy: {
    electricity: 0.7, // kg/kWh – override with ElectricityFactors[region] at runtime
  },
  shopping: {
    small_purchase: 2.0,
    medium_purchase: 8.0,
    large_purchase: 20.0,
  },
  waste: {
    recycled_item: -0.2,
    plastic_bottle: 0.1,
  }
};

/** Returns electricity factor adjusted for the user's region */
export const getElectricityFactor = (region: Region = 'Global'): number => {
  return ElectricityFactors[region] ?? ElectricityFactors.Global;
};
