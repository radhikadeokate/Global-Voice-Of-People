from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv("../.env")

app = FastAPI()

@app.get("/")
def root():
    return {
        "status": "FastAPI backend is running",
        "gnews_key_loaded": bool(os.getenv("GNEWS_API_KEY"))
    }
