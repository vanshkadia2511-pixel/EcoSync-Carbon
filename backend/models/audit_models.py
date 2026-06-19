from pydantic import BaseModel, Field
from typing import Optional, Dict, Literal

class TransportInput(BaseModel):
    mode: Literal['car', 'bus', 'train', 'bike', 'walk'] = Field(..., description="car, bus, train, bike, walk")
    kmPerWeek: float = Field(..., ge=0.0)

class CarbonAuditInput(BaseModel):
    sessionId: str
    transport: TransportInput
    diet: Literal['vegan', 'vegetarian', 'omnivore', 'meat-heavy'] = Field(..., description="vegan, vegetarian, omnivore, meat-heavy")
    electricityKwhPerMonth: float = Field(..., ge=0.0)
    shoppingLevel: Literal['low', 'medium', 'high'] = Field(..., description="low, medium, high")
    flightKmPerMonth: Optional[float] = Field(default=0.0, ge=0.0)
    householdSize: Optional[int] = Field(default=1, ge=1)
