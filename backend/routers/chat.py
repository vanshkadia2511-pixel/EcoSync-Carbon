import time
from collections import defaultdict
from fastapi import APIRouter, HTTPException, status
from models.chat_models import ChatInput
from services.gemini_service import gemini_service

router = APIRouter()

# Simple session rate limiter: 5 requests per 10 seconds
_chat_rate_limits = defaultdict(list)
LIMIT_WINDOW = 10.0
LIMIT_MAX = 5

@router.post("/chat")
async def chat_coach(payload: ChatInput):
    now = time.time()
    session_id = payload.sessionId
    
    # Filter out timestamps older than the window
    _chat_rate_limits[session_id] = [t for t in _chat_rate_limits[session_id] if now - t < LIMIT_WINDOW]
    
    if len(_chat_rate_limits[session_id]) >= LIMIT_MAX:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please wait a few seconds before messaging again."
        )
        
    _chat_rate_limits[session_id].append(now)

    try:
        latest_fp_dict = payload.latestFootprint.model_dump() if payload.latestFootprint else None
        reply_data = await gemini_service.get_coach_reply(payload.message, latest_fp_dict)
        return reply_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

