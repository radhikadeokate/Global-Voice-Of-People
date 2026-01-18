# backend/fastapi_app/app/api/news.py
from fastapi import APIRouter, Query, HTTPException
from pydantic import BaseModel
from typing import List
import requests

from app.services.news_service import fetch_news


class Article(BaseModel):
    title: str
    description: str
    url: str
    source: str


class NewsResponse(BaseModel):
    topic: str
    count: int
    articles: List[Article]


router = APIRouter()


@router.get(
    "/news",
    summary="Fetch live GNews articles by topic",
    response_model=NewsResponse,
)
def get_news(
    topic: str = Query(..., description="Topic to search for (e.g., technology, sports)"),
    lang: str = Query("en", description="Language code (e.g., en, hi)"),
    max_results: int = Query(10, ge=1, le=50, description="Max number of articles (1–50)"),
):
    try:
        articles = fetch_news(topic=topic, lang=lang, max_results=max_results)
    except RuntimeError as e:
        # External API or configuration failure
        raise HTTPException(status_code=502, detail=str(e))

    return NewsResponse(
        topic=topic,
        count=len(articles),
        articles=articles,
    )