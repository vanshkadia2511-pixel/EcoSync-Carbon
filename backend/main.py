from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routers import audit, chat, history, challenge

app = FastAPI(
    title="EcoTrack Carbon API",
    description="Backend API for EcoTrack Carbon Footprint Tracker",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,  # Restricted CORS origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Mount API Routers under /api
app.include_router(audit.router, prefix="/api", tags=["Audit"])
app.include_router(chat.router, prefix="/api", tags=["Coach Chat"])
app.include_router(history.router, prefix="/api", tags=["History"])
app.include_router(challenge.router, prefix="/api", tags=["Challenges"])

# GET /api/health
@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "mode": settings.MODE,
        "version": "1.0.0"
    }

# Serve React static files in production
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    # Mount assets folder specifically to avoid catching everything
    assets_dir = os.path.join(static_dir, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    # Fallback to index.html for SPA client-side routing
    @app.get("/{catchall:path}")
    async def serve_spa(catchall: str):
        if catchall.startswith("api"):
            from fastapi import HTTPException
            raise HTTPException(status_code=404, detail="API endpoint not found")
        
        # Check if the specific file exists in static folder (like favicon.svg, etc.)
        specific_file = os.path.join(static_dir, catchall)
        if os.path.exists(specific_file) and os.path.isfile(specific_file):
            return FileResponse(specific_file)
            
        return FileResponse(os.path.join(static_dir, "index.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
