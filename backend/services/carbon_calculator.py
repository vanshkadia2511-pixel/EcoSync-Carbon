from typing import Dict, Any
from functools import lru_cache
from services.emission_factors import (
    TRANSPORT_FACTORS,
    FLIGHT_FACTOR,
    DIET_MONTHLY_KG,
    ELECTRICITY_FACTOR,
    SHOPPING_MONTHLY_KG
)

@lru_cache(maxsize=1024)
def calculate_score(monthly_co2: float) -> int:
    if monthly_co2 <= 250.0:
        score = 100.0 - (monthly_co2 / 250.0) * 10.0
    elif monthly_co2 <= 403.4:
        # Interpolate between 250 (score 90) and 403.4 (score 72)
        pct = (monthly_co2 - 250.0) / (403.4 - 250.0)
        score = 90.0 - pct * 18.0
    elif monthly_co2 <= 500.0:
        # Interpolate between 403.4 (score 72) and 500 (score 70)
        pct = (monthly_co2 - 403.4) / (500.0 - 403.4)
        score = 72.0 - pct * 2.0
    elif monthly_co2 <= 800.0:
        # Interpolate between 500 (score 69) and 800 (score 50)
        pct = (monthly_co2 - 500.0) / 300.0
        score = 69.0 - pct * 19.0
    elif monthly_co2 <= 1200.0:
        # Interpolate between 800 (score 49) and 1200 (score 30)
        pct = (monthly_co2 - 800.0) / 400.0
        score = 49.0 - pct * 19.0
    else:
        # 1200+ -> score 0-29
        score = max(0.0, 29.0 - ((monthly_co2 - 1200.0) / 1000.0) * 29.0)
    
    return min(100, max(0, int(round(score))))

def calculate_footprint(inputs: Dict[str, Any]) -> Dict[str, Any]:
    # Transport
    transport_in = inputs.get("transport", {})
    t_mode = transport_in.get("mode", "walk")
    t_km = transport_in.get("kmPerWeek", 0.0)
    transport_val = t_km * 4.0 * TRANSPORT_FACTORS.get(t_mode, 0.0)

    # Diet
    diet_type = inputs.get("diet", "omnivore")
    diet_val = DIET_MONTHLY_KG.get(diet_type, 150.0)

    # Electricity
    elec_kwh = inputs.get("electricityKwhPerMonth", 0.0)
    elec_val = elec_kwh * ELECTRICITY_FACTOR

    # Shopping
    shop_level = inputs.get("shoppingLevel", "medium")
    shop_val = SHOPPING_MONTHLY_KG.get(shop_level, 70.0)

    # Flights
    flight_km = inputs.get("flightKmPerMonth", 0.0)
    flight_val = flight_km * FLIGHT_FACTOR

    # Monthly / Yearly
    monthly_kg = transport_val + diet_val + elec_val + shop_val + flight_val
    yearly_kg = monthly_kg * 12.0

    # Breakdown
    breakdown = {
        "transport": round(transport_val, 1),
        "diet": round(diet_val, 1),
        "electricity": round(elec_val, 1),
        "shopping": round(shop_val, 1),
        "flights": round(flight_val, 1)
    }

    # Highest Category
    highest_cat = max(breakdown, key=breakdown.get)

    # Score
    score = calculate_score(monthly_kg)

    # Top Actions / Opportunities
    top_actions = []
    if highest_cat == "electricity":
        top_actions = [
            "Reduce electricity use by 10% this month",
            "Shift 2 commute days to public transport",
            "Choose one no-buy week for non-essential shopping"
        ]
    elif highest_cat == "transport":
        top_actions = [
            "Shift 2 commute days to public transport",
            "Reduce electricity use by 10% this month",
            "Cycle for trips under 5 km"
        ]
    else:
        top_actions = [
            "Choose one no-buy week for non-essential shopping",
            "Try 2 plant-based meals this week",
            "Reduce electricity use by 10% this month"
        ]

    return {
        "monthlyKgCO2e": round(monthly_kg, 1),
        "yearlyKgCO2e": round(yearly_kg, 1),
        "score": score,
        "highestCategory": highest_cat,
        "breakdown": breakdown,
        "topActions": top_actions
    }
