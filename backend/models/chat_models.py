from pydantic import BaseModel
from typing import Optional, Dict, Any

class ChatFootprint(BaseModel):
    monthlyKgCO2e: float
    yearlyKgCO2e: float
    score: int
    highestCategory: str
    breakdown: Dict[str, float]

class ChatInput(BaseModel):
    sessionId: str
    message: str
    latestFootprint: Optional[ChatFootprint] = None
