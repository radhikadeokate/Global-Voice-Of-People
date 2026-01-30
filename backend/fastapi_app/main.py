from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import logging
import os

# Load environment variables
load_dotenv()

# Logging config
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s",
)

# Import routers AFTER env + logging
from app.api.news import router as news_router
from app.api.dashboard import router as dashboard_router

app = FastAPI(
    title="Global Voice of People API",
    version="1.0.0",
    description="Backend API for fetching and analyzing global news",
)

# ✅ FINAL CORS CONFIG (safe for dev & team work)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # allow all during development
    allow_credentials=False,    # must be False when allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(news_router)
app.include_router(dashboard_router)

# Health check
@app.get("/", summary="Health check")
def root():
    return {
        "status": "FastAPI backend is running",
        "gnews_key_loaded": bool(os.getenv("GNEWS_API_KEY")),
    }
