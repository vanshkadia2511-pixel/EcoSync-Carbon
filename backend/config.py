import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_ID: str = os.getenv("GOOGLE_CLOUD_PROJECT", "")
    MODE: str = os.getenv("MODE", "demo") # "demo" or "production"
    
    # Firestore setting (only used if in production mode or forced)
    USE_FIRESTORE: bool = MODE == "production" and bool(PROJECT_ID)
    
    # Vertex AI setting
    USE_VERTEX_AI: bool = MODE == "production" and bool(PROJECT_ID)

    # Allowed CORS Origins
    ALLOWED_ORIGINS: list[str] = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:8000").split(",")

settings = Settings()
