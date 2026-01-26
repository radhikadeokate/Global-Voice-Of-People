from app.services.openai_service import analyze_public_opinion


def analyze_article(article: dict) -> dict:
    """
    Takes a single article from GNews and enriches it with AI analysis
    """

    combined_text = f"""
    Title: {article.get('title', '')}
    Description: {article.get('description', '')}
    """

    analysis = analyze_public_opinion(combined_text)

    return {
        **article,   # keep original fields
        "sentiment": analysis["sentiment"],
        "bias": analysis["bias"],
        "explanation": analysis["explanation"],
    }
