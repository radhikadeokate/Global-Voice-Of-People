from app.services.openai_service import analyze_public_opinion

def analyze_article(article: dict) -> dict:
    if not isinstance(article, dict):
        return {}

    title = article.get("title", "")
    description = article.get("description", "")

    combined_text = f"Title: {title}\nDescription: {description}".strip()

    if not combined_text:
        analysis = {
            "sentiment": "neutral",
            "bias": "neutral",
            "explanation": "No content to analyze."
        }
    else:
        analysis = analyze_public_opinion(combined_text)

    return {
        **article,
        "sentiment": analysis.get("sentiment", "neutral"),
        "bias": analysis.get("bias", "neutral"),
        "explanation": analysis.get("explanation", "No explanation available."),
    }
