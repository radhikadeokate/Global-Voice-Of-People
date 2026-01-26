from dotenv import load_dotenv
load_dotenv()

from openai import OpenAI
import json
import os
import logging

logger = logging.getLogger(__name__)

# Initialize OpenAI client using env variable
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def analyze_public_opinion(text: str) -> dict:
    """
    Takes cleaned article text and returns:
    sentiment, bias, explanation
    """

    if not text.strip():
        return {
            "sentiment": "neutral",
            "bias": "neutral",
            "explanation": "No sufficient content to analyze."
        }

    prompt = f"""
    Analyze the following public opinion text and return ONLY valid JSON with:

    - sentiment: positive / negative / neutral
    - bias: left / right / neutral
    - explanation: short explanation (2–3 lines)

    Text:
    {text}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You analyze public opinion data."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )

        result_text = response.choices[0].message.content
        return json.loads(result_text)

    except Exception as e:
        logger.error(f"OpenAI analysis failed: {e}")
        return {
            "sentiment": "neutral",
            "bias": "neutral",
            "explanation": "AI analysis failed."
        }
