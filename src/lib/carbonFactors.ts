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
    electricity: 0.7, // kg/kWh
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
