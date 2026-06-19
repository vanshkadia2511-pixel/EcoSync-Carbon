from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_endpoint():
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ok"
    assert "mode" in data

def test_audit_endpoint():
    payload = {
        "sessionId": "test-user-999",
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
    res = client.post("/api/audit", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["monthlyKgCO2e"] == 403.4
    assert data["score"] == 72
    assert data["highestCategory"] == "electricity"
    assert "recordId" in data

def test_chat_endpoint():
    payload = {
        "sessionId": "test-user-999",
        "message": "Give me some energy saving tips.",
        "latestFootprint": {
            "monthlyKgCO2e": 403.4,
            "yearlyKgCO2e": 4840.8,
            "score": 72,
            "highestCategory": "electricity",
            "breakdown": {
                "transport": 100.8,
                "diet": 85.0,
                "electricity": 147.6,
                "shopping": 70.0,
                "flights": 0.0
            }
        }
    }
    res = client.post("/api/chat", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "reply" in data
    assert "actions" in data
    assert data["source"] == "mock"
