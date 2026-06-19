import uuid
import datetime
from fastapi import APIRouter, HTTPException
from models.audit_models import CarbonAuditInput
from services.carbon_calculator import calculate_footprint
from services.storage_service import storage_service
from config import settings

router = APIRouter()

@router.post("/audit")
async def create_audit(payload: CarbonAuditInput):
    try:
        inputs_dict = payload.model_dump()
        results = calculate_footprint(inputs_dict)
        
        record = {
            "recordId": f"audit_{uuid.uuid4().hex[:8]}",
            "sessionId": payload.sessionId,
            "createdAt": datetime.datetime.now(datetime.timezone.utc).isoformat().replace('+00:00', 'Z'),
            "monthlyKgCO2e": results["monthlyKgCO2e"],
            "yearlyKgCO2e": results["yearlyKgCO2e"],
            "score": results["score"],
            "highestCategory": results["highestCategory"],
            "breakdown": results["breakdown"],
            "inputs": inputs_dict,
            "topActions": results["topActions"],
            "mode": settings.MODE
        }
        
        storage_service.save_audit(record)
        return record
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
