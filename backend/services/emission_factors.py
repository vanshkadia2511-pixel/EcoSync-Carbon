# Exact README emission factors

TRANSPORT_FACTORS = {
    "car": 0.21,        # kg CO2e/km
    "bus": 0.089,       # kg CO2e/km
    "train": 0.041,     # kg CO2e/km
    "bike": 0.0,
    "walk": 0.0
}

FLIGHT_FACTOR = 0.255   # kg CO2e/km

DIET_MONTHLY_KG = {
    "vegan": 55.0,
    "vegetarian": 85.0,
    "omnivore": 150.0,
    "meat-heavy": 230.0
}

ELECTRICITY_FACTOR = 0.82 # kg CO2e/kWh

SHOPPING_MONTHLY_KG = {
    "low": 30.0,
    "medium": 70.0,
    "high": 130.0
}
