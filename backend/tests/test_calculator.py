from services.carbon_calculator import calculate_footprint, calculate_score

def test_calculator_spec_values():
    inputs = {
        "transport": {
            "mode": "car",
            "kmPerWeek": 120.0
        },
        "diet": "vegetarian",
        "electricityKwhPerMonth": 180.0,
        "shoppingLevel": "medium",
        "flightKmPerMonth": 0.0,
        "householdSize": 1
    }
    
    results = calculate_footprint(inputs)
    
    assert results["monthlyKgCO2e"] == 403.4
    assert results["yearlyKgCO2e"] == 4840.8
    assert results["score"] == 72
    assert results["highestCategory"] == "electricity"
    assert results["breakdown"]["transport"] == 100.8
    assert results["breakdown"]["diet"] == 85.0
    assert results["breakdown"]["electricity"] == 147.6
    assert results["breakdown"]["shopping"] == 70.0
    assert results["breakdown"]["flights"] == 0.0

def test_score_boundaries():
    # 0 kg -> score 100
    assert calculate_score(0) == 100
    # 250 kg -> score 90
    assert calculate_score(250) == 90
    # 403.4 kg -> score 72
    assert calculate_score(403.4) == 72
    # 500 kg -> score 70
    assert calculate_score(500) == 70
    # 800 kg -> score 50
    assert calculate_score(800) == 50
    # 1200 kg -> score 30
    assert calculate_score(1200) == 30

def test_extreme_boundaries():
    # Negative check (should technically handle it based on formula)
    assert calculate_score(-100) == 100
    
    # Very high emissions > 1200
    assert calculate_score(2000) == 6
    assert calculate_score(5000) == 0

def test_lru_cache_efficiency():
    # Calling the same value repeatedly should be cached
    for _ in range(100):
        assert calculate_score(403.4) == 72
