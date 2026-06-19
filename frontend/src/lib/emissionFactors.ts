// Emission factors — EXACT values from README spec
import type { TransportMode, DietType, ShoppingLevel } from '../types/carbon';

export const TRANSPORT_FACTORS: Record<TransportMode, number> = {
  car: 0.21,      // kg CO₂e per km
  bus: 0.089,
  train: 0.041,
  bike: 0,
  walk: 0,
};

export const DIET_MONTHLY_KG: Record<DietType, number> = {
  vegan: 55,
  vegetarian: 85,
  omnivore: 150,
  'meat-heavy': 230,
};

export const SHOPPING_MONTHLY_KG: Record<ShoppingLevel, number> = {
  low: 30,
  medium: 70,
  high: 130,
};

export const ELECTRICITY_FACTOR = 0.82; // kg CO₂e per kWh
export const FLIGHT_FACTOR = 0.255;     // kg CO₂e per km

// Eco Score logic — EXACT from README
export function calcEcoScore(monthlyKgCO2e: number): number {
  if (monthlyKgCO2e <= 250) return Math.round(90 + (250 - monthlyKgCO2e) / 250 * 10);
  if (monthlyKgCO2e <= 500) return Math.round(70 + (500 - monthlyKgCO2e) / 250 * 19);
  if (monthlyKgCO2e <= 800) return Math.round(50 + (800 - monthlyKgCO2e) / 300 * 19);
  if (monthlyKgCO2e <= 1200) return Math.round(30 + (1200 - monthlyKgCO2e) / 400 * 19);
  return Math.max(0, Math.round(29 - (monthlyKgCO2e - 1200) / 100));
}

export function getScoreMessage(monthlyKgCO2e: number): string {
  if (monthlyKgCO2e <= 250) return 'Excellent low-impact lifestyle';
  if (monthlyKgCO2e <= 500) return 'Good start with clear improvement options';
  if (monthlyKgCO2e <= 800) return 'Moderate footprint with useful action areas';
  if (monthlyKgCO2e <= 1200) return 'High footprint with major opportunities';
  return 'Very high footprint; focus on one category first';
}
