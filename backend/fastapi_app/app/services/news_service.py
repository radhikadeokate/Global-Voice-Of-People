# backend/fastapi_app/app/services/news_service.py
import os
import re
import logging
import requests
from typing import List, Dict, Any

BASE_URL = "https://gnews.io/api/v4/search"

logger = logging.getLogger(__name__)


def _clean_text(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r"<.*?>", "", text)   # remove HTML tags
    text = re.sub(r"\s+", " ", text)    # normalize whitespace
    return text.strip()


def fetch_news(topic: str, lang: str = "en", max_results: int = 10) -> List[Dict[str, Any]]:
    api_key = os.getenv("GNEWS_API_KEY")
    if not api_key:
        logger.error("GNEWS_API_KEY is not set")
        raise RuntimeError("GNEWS_API_KEY is not set")

    params = {
        "q": topic,
        "lang": lang,
        "max": max_results,
        "token": api_key,
    }

    logger.info(
        f"Fetching news | topic={topic}, lang={lang}, max_results={max_results}"
    )

    try:
        response = requests.get(BASE_URL, params=params, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        logger.error(f"GNews API request failed: {e}")
        raise RuntimeError(f"GNews request failed: {e}")

    data = response.json()
    articles: List[Dict[str, Any]] = []

    for item in data.get("articles", []):
        articles.append({
            "title": _clean_text(item.get("title")),
            "description": _clean_text(item.get("description")),
            "url": item.get("url"),
            "source": item.get("source", {}).get("name"),
        })

    logger.info(f"Fetched {len(articles)} articles")
    return articles