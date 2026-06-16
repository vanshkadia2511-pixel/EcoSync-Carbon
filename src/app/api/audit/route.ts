import { NextResponse } from 'next/server';
import { CarbonFactors, ElectricityFactors, type Region } from '@/lib/carbonFactors';

// Diet monthly baseline emissions (kg CO2e)
const DIET_BASELINES: Record<string, number> = {
  vegan: 55,
  vegetarian: 85,
  omnivore: 150,
  meat_heavy: 230,
  // fallback aliases
  plant_based: 55,
  heavy_meat: 230,
};

// Shopping level monthly baseline emissions (kg CO2e)
const SHOPPING_BASELINES: Record<string, number> = {
  low: 30,
  medium: 70,
  high: 130,
};

const VALID_TRANSPORT_MODES = Object.keys(CarbonFactors.transport);
const VALID_DIET_TYPES = Object.keys(DIET_BASELINES);
const VALID_SHOPPING_LEVELS = Object.keys(SHOPPING_BASELINES);
const VALID_REGIONS = Object.keys(ElectricityFactors);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { transport, diet, electricityKwhPerMonth, shoppingLevel, region } = body;

    // --- Input validation & sanitization ---
    const errors: string[] = [];

    if (transport !== undefined) {
      if (!transport || typeof transport !== 'object') {
        errors.push('transport must be an object');
      } else {
        if (!VALID_TRANSPORT_MODES.includes(transport.mode)) {
          errors.push(`transport.mode must be one of: ${VALID_TRANSPORT_MODES.join(', ')}`);
        }
        const km = Number(transport.kmPerWeek);
        if (!Number.isFinite(km) || km < 0 || km > 10000) {
          errors.push('transport.kmPerWeek must be a number between 0 and 10000');
        }
      }
    }

    if (diet !== undefined && !VALID_DIET_TYPES.includes(diet)) {
      errors.push(`diet must be one of: ${VALID_DIET_TYPES.join(', ')}`);
    }

    if (electricityKwhPerMonth !== undefined) {
      const kwh = Number(electricityKwhPerMonth);
      if (!Number.isFinite(kwh) || kwh < 0 || kwh > 50000) {
        errors.push('electricityKwhPerMonth must be a number between 0 and 50000');
      }
    }

    if (shoppingLevel !== undefined && !VALID_SHOPPING_LEVELS.includes(shoppingLevel)) {
      errors.push(`shoppingLevel must be one of: ${VALID_SHOPPING_LEVELS.join(', ')}`);
    }

    if (region !== undefined && !VALID_REGIONS.includes(region)) {
      errors.push(`region must be one of: ${VALID_REGIONS.join(', ')}`);
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
    }

    // --- Calculation using real emission factors ---
    const effectiveRegion: Region = VALID_REGIONS.includes(region) ? region : 'Asia';
    const electricityFactor = ElectricityFactors[effectiveRegion];

    // Transport: weekly km → monthly (×4.33 weeks/month)
    const transportMode = transport?.mode as keyof typeof CarbonFactors.transport;
    const transportFactor = transportMode ? (CarbonFactors.transport[transportMode] ?? 0) : 0;
    const transportMonthlyKg = (transport?.kmPerWeek ?? 0) * 4.33 * transportFactor;

    // Diet: monthly baseline
    const dietMonthlyKg = DIET_BASELINES[diet] ?? DIET_BASELINES.omnivore;

    // Electricity: kWh/month × region factor
    const electricityMonthlyKg = (electricityKwhPerMonth ?? 0) * electricityFactor;

    // Shopping: monthly baseline
    const shoppingMonthlyKg = SHOPPING_BASELINES[shoppingLevel] ?? SHOPPING_BASELINES.medium;

    const monthlyKgCO2e = transportMonthlyKg + dietMonthlyKg + electricityMonthlyKg + shoppingMonthlyKg;
    const yearlyKgCO2e = monthlyKgCO2e * 12;

    // Score: penalize based on a 400 kg/month average threshold
    const score = Math.max(0, Math.min(100, Math.round(100 - (monthlyKgCO2e / 400) * 40)));

    // Determine highest category
    const breakdown = {
      transport: Number(transportMonthlyKg.toFixed(2)),
      diet: Number(dietMonthlyKg.toFixed(2)),
      electricity: Number(electricityMonthlyKg.toFixed(2)),
      shopping: Number(shoppingMonthlyKg.toFixed(2)),
    };
    const highestCategory = (Object.entries(breakdown).sort((a, b) => b[1] - a[1])[0][0]);

    // Top actions based on highest emitter
    const actionMap: Record<string, string> = {
      transport: 'Shift 2 commute days to public transport or walk short trips',
      diet: 'Try 3 plant-based meals this week to reduce food emissions',
      electricity: 'Reduce electricity use by 10% — switch off idle appliances',
      shopping: 'Choose one no-buy week for non-essential shopping',
    };
    const topActions = [
      actionMap[highestCategory],
      'Track your carbon footprint weekly for better insights',
    ];

    return NextResponse.json({
      monthlyKgCO2e: Number(monthlyKgCO2e.toFixed(2)),
      yearlyKgCO2e: Number(yearlyKgCO2e.toFixed(2)),
      score,
      highestCategory,
      breakdown,
      topActions,
      region: effectiveRegion,
    });
  } catch (error) {
    console.error('Audit API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process audit. Please check your request body and try again.' },
      { status: 500 }
    );
  }
}

