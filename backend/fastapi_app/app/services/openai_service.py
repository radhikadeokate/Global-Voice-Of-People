# backend/services/openai_service.py

from dotenv import load_dotenv
load_dotenv()

import os
import json
import logging
from typing import Dict, Any
from openai import OpenAI

logger = logging.getLogger(__name__)

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    timeout=15
)

SYSTEM_PROMPT = """
You analyze public opinion in news or text.

Return ONLY valid JSON with exactly these keys:
{
  "sentiment": "positive" | "negative" | "neutral",
  "bias": "left" | "right" | "neutral",
  "explanation": string
}
"""

def analyze_public_opinion(text: str) -> Dict[str, Any]:
    if not text or not text.strip():
        return _fallback("Insufficient content for analysis.")

    try:
        response = client.responses.create(
            model="gpt-4o-mini",
            input=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": text}
            ],
            temperature=0.3
        )

        raw_output = response.output_text
        data = json.loads(raw_output)

        return {
            "sentiment": data.get("sentiment", "neutral"),
            "bias": data.get("bias", "neutral"),
            "explanation": data.get(
                "explanation",
                "No explanation provided."
            )
        }

    except json.JSONDecodeError as e:
        logger.error(f"JSON parsing failed: {e}")
        return _fallback("Invalid JSON returned by AI.")

    except Exception as e:
        logger.error(f"OpenAI request failed: {e}")
        return _fallback("AI service unavailable.")


def _fallback(reason: str) -> Dict[str, Any]:
    return {
        "sentiment": "neutral",
        "bias": "neutral",
        "explanation": reason
    }