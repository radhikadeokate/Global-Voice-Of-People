# backend/fastapi_app/main.py
from fastapi import FastAPI
from dotenv import load_dotenv
import logging
import os

# Load environment variables (.env should be in fastapi_app root)
load_dotenv()

# Basic logging configuration (internship + production friendly)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s",
)

# Import routers AFTER env + logging setup
from app.api.news import router as news_router

app = FastAPI(
    title="Global Voice of People API",
    version="1.0.0",
    description="Backend API for fetching and analyzing global news",
)

# Register routers
app.include_router(news_router)


@app.get("/", summary="Health check")
def root():
    return {
        "status": "FastAPI backend is running",
        "gnews_key_loaded": bool(os.getenv("GNEWS_API_KEY")),
    }
