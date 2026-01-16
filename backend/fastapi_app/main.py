from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv("../.env")  # load env from backend folder

app = FastAPI()

@app.get("/health")
def health_check():
    return {
        "status": "FastAPI backend is running",
        "gnews_key_loaded": bool(os.getenv("GNEWS_API_KEY"))
    }
