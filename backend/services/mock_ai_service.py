import random
from typing import Dict, Any, List

MOCK_REPLIES_TEMPLATES = {
    "electricity": [
        "Your biggest opportunity is electricity. Currently, you use {electricity_kwh} kWh/month, emitting {electricity_co2} kg CO₂e. This week, try switching off standby devices or lowering AC runtimes by 1 hour daily to save energy.",
        "Electricity is your highest footprint contributor at {electricity_co2} kg CO₂e/month. Consider utilizing natural light during daytime and replacing incandescent bulbs with LED variants.",
        "You could save up to {electricity_savings} kg CO₂e this month by optimizing household energy. Try setting your AC thermostat 1°C higher and unplugging chargers when not active."
    ],
    "transport": [
        "Transport is your highest-impact area, contributing {transport_co2} kg CO₂e/month via {transport_mode}. Try shifting 2 commute days to public transit or carpooling to reduce this footprint.",
        "Your weekly travel of {transport_km} km on {transport_mode} emits {transport_co2} kg CO₂e monthly. Cycling or walking for trips under 5 km is an excellent way to introduce a zero-emission habit.",
        "To reduce your transport footprint ({transport_co2} kg CO₂e), consider organizing combined errands or working remotely once a week if permitted."
    ],
    "diet": [
        "Diet contributes {diet_co2} kg CO₂e/month to your footprint. Since you follow a {diet_type} diet, introducing 2–3 plant-based meals per week is one of the most effective swaps you can make.",
        "Your food footprint is currently {diet_co2} kg CO₂e. Swapping high-impact meats for chicken or plant proteins even once a week makes a measurable reduction.",
        "A {diet_type} diet emits {diet_co2} kg CO₂e monthly. Meal planning can help reduce food waste, saving both carbon emissions and grocery costs."
    ],
    "shopping": [
        "Shopping is your top category, emitting {shopping_co2} kg CO₂e. Try a one-week no-buy challenge for non-essential purchases, and prioritize durable, second-hand items.",
        "Your monthly consumption footprint is {shopping_co2} kg CO₂e. When you shop, consider choosing products with minimal packaging or repair before choosing to replace them.",
        "To cut down on your shopping footprint ({shopping_co2} kg CO₂e), focus on quality over quantity and support local, circular economy initiatives."
    ],
    "flights": [
        "Flights contribute {flights_co2} kg CO₂e to your footprint. For short-distance journeys, check train options or combine business trips to reduce total flight count.",
        "Aviation emissions are high ({flights_co2} kg CO₂e). Choosing direct flights and packing lighter are practical ways to minimize travel footprint."
    ],
    "general": [
        "You're doing great across categories! Focus on consistency. Turning off unused appliances, choosing local food, and walking more can help secure your score.",
        "Consistency is key! Try setting a small weekly goal (like one meat-free day or one car-free commute) and log your progress next week."
    ]
}

MOCK_ACTIONS = {
    "electricity": [
        {"title": "Switch off standby devices", "category": "electricity", "impact": "medium", "difficulty": "easy", "estimatedKgCO2eSaved": 5, "cost": "free", "timeframe": "this week"},
        {"title": "Reduce AC usage by 1 hour per day", "category": "electricity", "impact": "medium", "difficulty": "easy", "estimatedKgCO2eSaved": 8, "cost": "free", "timeframe": "this week"}
    ],
    "transport": [
        {"title": "Take public transport 2 days/week", "category": "transport", "impact": "high", "difficulty": "medium", "estimatedKgCO2eSaved": 12, "cost": "free", "timeframe": "this week"},
        {"title": "Cycle for trips under 5 km", "category": "transport", "impact": "medium", "difficulty": "medium", "estimatedKgCO2eSaved": 8, "cost": "free", "timeframe": "this week"}
    ],
    "diet": [
        {"title": "Try 2 plant-based meals this week", "category": "diet", "impact": "high", "difficulty": "easy", "estimatedKgCO2eSaved": 10, "cost": "free", "timeframe": "this week"},
        {"title": "Swap beef for chicken once", "category": "diet", "impact": "medium", "difficulty": "easy", "estimatedKgCO2eSaved": 5, "cost": "free", "timeframe": "this week"}
    ],
    "shopping": [
        {"title": "1 week no-buy challenge", "category": "shopping", "impact": "high", "difficulty": "medium", "estimatedKgCO2eSaved": 15, "cost": "free", "timeframe": "this week"}
    ],
    "flights": [
        {"title": "Replace 1 short flight with train", "category": "flights", "impact": "high", "difficulty": "medium", "estimatedKgCO2eSaved": 50, "cost": "may save money", "timeframe": "next trip"}
    ],
    "general": [
        {"title": "Complete a weekly challenge", "category": "electricity", "impact": "medium", "difficulty": "easy", "estimatedKgCO2eSaved": 5, "cost": "free", "timeframe": "this week"}
    ]
}

def get_mock_reply(message: str, highest_category: str, latest_footprint: Dict[str, Any] = None) -> Dict[str, Any]:
    lower_msg = message.lower()
    category = highest_category if highest_category in MOCK_REPLIES_TEMPLATES else "general"

    if "transport" in lower_msg or "car" in lower_msg or "travel" in lower_msg:
        category = "transport"
    elif "food" in lower_msg or "diet" in lower_msg or "meal" in lower_msg:
        category = "diet"
    elif "electric" in lower_msg or "energy" in lower_msg or "power" in lower_msg:
        category = "electricity"
    elif "shop" in lower_msg or "buy" in lower_msg or "purchase" in lower_msg:
        category = "shopping"
    elif "flight" in lower_msg or "fly" in lower_msg:
        category = "flights"

    # Select random template
    templates = MOCK_REPLIES_TEMPLATES.get(category, MOCK_REPLIES_TEMPLATES["general"])
    template = random.choice(templates)

    # Defaults for variable interpolation
    vars_dict = {
        "electricity_kwh": "180",
        "electricity_co2": "147.6",
        "electricity_savings": "13",
        "transport_mode": "car",
        "transport_km": "120",
        "transport_co2": "100.8",
        "diet_type": "vegetarian",
        "diet_co2": "85.0",
        "shopping_co2": "70.0",
        "flights_co2": "0.0"
    }

    # Extract actual user values if available
    if latest_footprint:
        breakdown = latest_footprint.get("breakdown", {})
        inputs = latest_footprint.get("inputs", {})
        
        vars_dict["electricity_co2"] = str(breakdown.get("electricity", 147.6))
        vars_dict["transport_co2"] = str(breakdown.get("transport", 100.8))
        vars_dict["diet_co2"] = str(breakdown.get("diet", 85.0))
        vars_dict["shopping_co2"] = str(breakdown.get("shopping", 70.0))
        vars_dict["flights_co2"] = str(breakdown.get("flights", 0.0))

        if inputs:
            vars_dict["electricity_kwh"] = str(inputs.get("electricityKwhPerMonth", 180))
            diet = inputs.get("diet", "vegetarian")
            vars_dict["diet_type"] = diet
            
            t_input = inputs.get("transport", {})
            vars_dict["transport_mode"] = t_input.get("mode", "car")
            vars_dict["transport_km"] = str(t_input.get("kmPerWeek", 120))

    try:
        reply = template.format(**vars_dict)
    except Exception:
        reply = templates[0]

    return {
        "reply": reply,
        "actions": MOCK_ACTIONS.get(category, MOCK_ACTIONS["general"]),
        "source": "mock"
    }
