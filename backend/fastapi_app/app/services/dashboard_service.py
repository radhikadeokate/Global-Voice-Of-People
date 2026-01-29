from typing import Dict, Any, List
from collections import Counter, defaultdict

from app.services.news_service import fetch_news
from app.utils.analyzer import analyze_article


def get_dashboard_overview(
    topic: str,
    lang: str,
    max_results: int
) -> Dict[str, Any]:

    articles = fetch_news(
        topic=topic,
        lang=lang,
        max_results=max_results
    )

    if not articles:
        return {
            "topic": topic,
            "language": lang,
            "count": 0,
            "summary": {},
            "publisher_insights": {},
            "articles": [],
            "meta": {
                "status": "no_data",
                "analysis_failures": 0
            }
        }

    sentiment_count = Counter()
    bias_count = Counter()
    publisher_sentiment = defaultdict(Counter)

    analyzed_articles: List[Dict[str, Any]] = []
    analysis_failures = 0

    for article in articles:
        try:
            analyzed = analyze_article(article)
        except Exception:
            analysis_failures += 1
            analyzed = {
                **article,
                "sentiment": "neutral",
                "bias": "neutral",
                "explanation": "Analysis unavailable."
            }

        analyzed_articles.append(analyzed)

        sentiment = analyzed.get("sentiment", "neutral")
        bias = analyzed.get("bias", "neutral")
        publisher = analyzed.get("source", "unknown")

        sentiment_count[sentiment] += 1
        bias_count[bias] += 1
        publisher_sentiment[publisher][sentiment] += 1

    return {
        "topic": topic,
        "language": lang,
        "count": len(analyzed_articles),

        "summary": {
            "sentiment": dict(sentiment_count),
            "bias": dict(bias_count),
        },

        "publisher_insights": {
            publisher: dict(stats)
            for publisher, stats in publisher_sentiment.items()
        },

        "articles": analyzed_articles,

        "meta": {
            "news_provider": "GNews",
            "analysis_provider": "OpenAI",
            "analysis_failures": analysis_failures,
            "version": "dashboard-v1.5"
        }
    }
