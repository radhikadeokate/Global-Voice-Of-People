# backend/fastapi_app/app/api/news.py
from fastapi import APIRouter, Query, FastAPI
from app.services.news_service import fetch_news

# Define router
router = APIRouter()

@router.get("/news", summary="Fetch live GNews articles by topic")
def get_news(
    topic: str = Query(..., description="Topic to search for (e.g., technology, sports)"),
    lang: str = Query("en", description="Language code (e.g., en, hi)"),
    max_results: int = Query(10, ge=1, le=50, description="Max number of articles (1–50)")
):
    articles = fetch_news(topic=topic, lang=lang, max_results=max_results)
    return {
        "topic": topic,
        "count": len(articles),
        "articles": articles
    }

test_app = FastAPI()
test_app.include_router(router)
