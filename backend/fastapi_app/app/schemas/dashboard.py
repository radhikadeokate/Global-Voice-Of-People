from typing import Dict, Any, List
from pydantic import BaseModel


class DashboardMeta(BaseModel):
    news_provider: str | None = None
    analysis_provider: str | None = None
    analysis_failures: int = 0
    version: str | None = None
    status: str | None = None


class DashboardResponse(BaseModel):
    topic: str
    language: str
    count: int

    summary: Dict[str, Dict[str, int]]
    publisher_insights: Dict[str, Dict[str, int]]

    articles: List[Dict[str, Any]]
    meta: DashboardMeta