from fastapi import APIRouter, HTTPException, Query
from services.storage_service import storage_service

router = APIRouter()

@router.get("/history")
async def get_history(sessionId: str = Query(..., description="The user's session identifier")):
    try:
        records = storage_service.get_history(sessionId)
        # Match README schema by returning a list of dicts with basic fields
        formatted_records = []
        for r in records:
            formatted_records.append({
                "recordId": r["recordId"],
                "createdAt": r["createdAt"],
                "monthlyKgCO2e": r["monthlyKgCO2e"],
                "yearlyKgCO2e": r["yearlyKgCO2e"],
                "score": r["score"],
                "highestCategory": r["highestCategory"]
            })
        return {"records": formatted_records}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
