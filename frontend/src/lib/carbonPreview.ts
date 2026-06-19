// Real-time carbon preview — uses same factors as backend
import {
  TRANSPORT_FACTORS,
  DIET_MONTHLY_KG,
  SHOPPING_MONTHLY_KG,
  ELECTRICITY_FACTOR,
  FLIGHT_FACTOR,
  calcEcoScore,
} from './emissionFactors';
import type { CarbonAuditInput, FootprintBreakdown } from '../types/carbon';

export interface PreviewResult {
  transport: number;
  diet: number;
  electricity: number;
  shopping: number;
  flights: number;
  monthlyKgCO2e: number;
  yearlyKgCO2e: number;
  score: number;
  highestCategory: string;
  insightMessage: string;
}

export function calcPreview(input: Partial<CarbonAuditInput>): PreviewResult {
  const transport = input.transport
    ? TRANSPORT_FACTORS[input.transport.mode] * input.transport.kmPerWeek * 4
    : 0;

  const diet = input.diet ? DIET_MONTHLY_KG[input.diet] : 0;
  const electricity = input.electricityKwhPerMonth
    ? input.electricityKwhPerMonth * ELECTRICITY_FACTOR
    : 0;
  const shopping = input.shoppingLevel ? SHOPPING_MONTHLY_KG[input.shoppingLevel] : 0;
  const flights = input.flightKmPerMonth
    ? input.flightKmPerMonth * FLIGHT_FACTOR
    : 0;

  const monthlyKgCO2e = transport + diet + electricity + shopping + flights;
  const yearlyKgCO2e = monthlyKgCO2e * 12;
  const score = calcEcoScore(monthlyKgCO2e);

  const breakdown: FootprintBreakdown = { transport, diet, electricity, shopping, flights };
  const entries = Object.entries(breakdown) as [string, number][];
  const highest = entries.sort((a, b) => b[1] - a[1])[0];
  const highestCategory = highest[0];

  const categoryLabels: Record<string, string> = {
    transport: 'Transport',
    diet: 'Diet',
    electricity: 'Electricity',
    shopping: 'Shopping',
    flights: 'Flights',
  };

  const insightMessage =
    monthlyKgCO2e === 0
      ? 'Fill in your details to see your estimated footprint.'
      : `Your current estimate is ${monthlyKgCO2e.toFixed(1)} kg CO₂e/month. ${categoryLabels[highestCategory]} is your biggest category, so actions there may help the most.`;

  return {
    transport,
    diet,
    electricity,
    shopping,
    flights,
    monthlyKgCO2e,
    yearlyKgCO2e,
    score,
    highestCategory,
    insightMessage,
  };
}
