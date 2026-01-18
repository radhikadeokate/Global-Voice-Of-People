from fastapi import FastAPI
from dotenv import load_dotenv
import os

# load env
load_dotenv("../.env")

# import Bhakti's news router
from app.api.news import router as news_router

app = FastAPI()

# include news routes
app.include_router(news_router)

@app.get("/")
def root():
    return {
        "status": "FastAPI backend is running",
        "gnews_key_loaded": bool(os.getenv("GNEWS_API_KEY"))
    }
