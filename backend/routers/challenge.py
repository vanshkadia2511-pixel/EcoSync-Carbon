import uuid
from fastapi import APIRouter, HTTPException, Path
from models.challenge_models import ChallengeInput, ChallengeUpdate
from services.storage_service import storage_service

router = APIRouter()

@router.post("/challenge")
async def generate_challenge(payload: ChallengeInput):
    try:
        challenge = {
            "challengeId": f"challenge_{uuid.uuid4().hex[:8]}",
            "sessionId": payload.sessionId,
            "title": "Energy Saver Week",
            "description": "Reduce AC usage by 1 hour daily and switch off standby devices.",
            "category": "electricity",
            "estimatedImpactKg": 8.0,
            "difficulty": "easy",
            "completed": False
        }
        storage_service.save_challenge(challenge)
        return challenge
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/challenge/{challengeId}")
async def complete_challenge(payload: ChallengeUpdate, challengeId: str = Path(...)):
    try:
        updated = storage_service.update_challenge(challengeId, payload.completed)
        return {
            "challengeId": challengeId,
            "completed": updated.get("completed", payload.completed)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
