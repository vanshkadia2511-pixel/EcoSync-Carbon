import { describe, it, expect } from 'vitest';
import {
  calculateTransportEmission,
  calculateFoodEmission,
  calculateEnergyEmission,
  calculateShoppingEmission,
  calculateWasteEmission,
} from '@/lib/calculateEmission';
import { CarbonFactors } from '@/lib/carbonFactors';

describe('calculateTransportEmission', () => {
  it('returns 0 emission for walking', () => {
    expect(calculateTransportEmission('walk', 100)).toBe(0);
  });

  it('returns 0 emission for biking', () => {
    expect(calculateTransportEmission('bike', 50)).toBe(0);
  });

  it('calculates car emission correctly', () => {
    const result = calculateTransportEmission('car', 100);
    expect(result).toBeCloseTo(CarbonFactors.transport.car * 100);
  });

  it('calculates bus emission correctly', () => {
    const result = calculateTransportEmission('bus', 200);
    expect(result).toBeCloseTo(CarbonFactors.transport.bus * 200);
  });

  it('calculates train emission correctly', () => {
    const result = calculateTransportEmission('train', 300);
    expect(result).toBeCloseTo(CarbonFactors.transport.train * 300);
  });

  it('calculates flight emission correctly', () => {
    const result = calculateTransportEmission('flight', 1000);
    expect(result).toBeCloseTo(CarbonFactors.transport.flight * 1000);
  });

  it('returns 0 emission for 0 km', () => {
    expect(calculateTransportEmission('car', 0)).toBe(0);
  });
});

describe('calculateFoodEmission', () => {
  it('calculates plant-based meal emission correctly', () => {
    const result = calculateFoodEmission('plant_based_meal', 3);
    expect(result).toBeCloseTo(CarbonFactors.food.plant_based_meal * 3);
  });

  it('calculates meat-heavy meal emission correctly', () => {
    const result = calculateFoodEmission('meat_heavy_meal', 1);
    expect(result).toBeCloseTo(CarbonFactors.food.meat_heavy_meal);
  });

  it('defaults count to 1 if not provided', () => {
    expect(calculateFoodEmission('chicken_meal')).toBeCloseTo(CarbonFactors.food.chicken_meal);
  });

  it('meat-heavy emission is higher than plant-based for same count', () => {
    const plantBased = calculateFoodEmission('plant_based_meal', 1);
    const meatHeavy = calculateFoodEmission('meat_heavy_meal', 1);
    expect(meatHeavy).toBeGreaterThan(plantBased);
  });
});

describe('calculateEnergyEmission', () => {
  it('calculates electricity emission correctly', () => {
    const result = calculateEnergyEmission(100);
    expect(result).toBeCloseTo(CarbonFactors.energy.electricity * 100);
  });

  it('returns 0 for 0 kWh', () => {
    expect(calculateEnergyEmission(0)).toBe(0);
  });

  it('scales linearly with kWh', () => {
    const result1 = calculateEnergyEmission(50);
    const result2 = calculateEnergyEmission(100);
    expect(result2).toBeCloseTo(result1 * 2);
  });
});

describe('calculateShoppingEmission', () => {
  it('calculates small purchase emission correctly', () => {
    const result = calculateShoppingEmission('small_purchase', 2);
    expect(result).toBeCloseTo(CarbonFactors.shopping.small_purchase * 2);
  });

  it('large purchase has higher emission than small', () => {
    const small = calculateShoppingEmission('small_purchase', 1);
    const large = calculateShoppingEmission('large_purchase', 1);
    expect(large).toBeGreaterThan(small);
  });

  it('defaults count to 1', () => {
    expect(calculateShoppingEmission('medium_purchase')).toBeCloseTo(CarbonFactors.shopping.medium_purchase);
  });
});

describe('calculateWasteEmission', () => {
  it('returns negative emission for recycled items (carbon credit)', () => {
    expect(calculateWasteEmission('recycled_item', 1)).toBeLessThan(0);
  });

  it('returns positive emission for plastic bottle', () => {
    expect(calculateWasteEmission('plastic_bottle', 1)).toBeGreaterThan(0);
  });

  it('scales with count', () => {
    const single = calculateWasteEmission('plastic_bottle', 1);
    const triple = calculateWasteEmission('plastic_bottle', 3);
    expect(triple).toBeCloseTo(single * 3);
  });
});
