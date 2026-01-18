# backend/fastapi_app/app/services/news_service.py
import os
import re
import requests
from typing import List, Dict, Any
from dotenv import load_dotenv

# Load environment variables from .env (safe even if main.py also loads them)
load_dotenv()

GNEWS_API_URL = "https://gnews.io/api/v4/search"
GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")

def _ensure_api_key() -> None:
    """Fail fast if the key is missing."""
    if not GNEWS_API_KEY:
        raise RuntimeError("GNEWS_API_KEY is not set. Add it to your .env file.")

def clean_text(text: str) -> str:
    """Remove HTML tags and normalize whitespace."""
    if not text:
        return ""
    # Strip HTML tags
    text = re.sub(r"<.*?>", "", text)
    # Normalize whitespace
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def fetch_news(topic: str, lang: str = "en", max_results: int = 10) -> List[Dict[str, Any]]:
    """
    Fetch news articles from GNews by topic and clean text fields.
    Only responsibilities: fetch, search by topic, clean text.
    """
    _ensure_api_key()

    params = {
        "q": topic,
        "lang": lang,
        "max": max_results,
        "token": GNEWS_API_KEY,
    }

    resp = requests.get(GNEWS_API_URL, params=params, timeout=15)
    resp.raise_for_status()
    data = resp.json()

    cleaned: List[Dict[str, Any]] = []
    for a in data.get("articles", []):
        cleaned.append({
            "title": clean_text(a.get("title", "")),
            "description": clean_text(a.get("description", "")),
            "url": a.get("url"),
            "image": a.get("image"),
            "publishedAt": a.get("publishedAt"),
            "source": a.get("source", {}).get("name"),
        })
    return cleaned