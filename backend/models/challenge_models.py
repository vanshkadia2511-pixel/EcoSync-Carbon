from pydantic import BaseModel

class ChallengeInput(BaseModel):
    sessionId: str

class ChallengeUpdate(BaseModel):
    completed: bool
