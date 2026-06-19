import json
from typing import Dict, Any
from config import settings
from services.mock_ai_service import get_mock_reply

class GeminiService:
    def __init__(self):
        self.active = settings.USE_VERTEX_AI
        if self.active:
            try:
                import vertexai
                from vertexai.generative_models import GenerativeModel
                vertexai.init(project=settings.PROJECT_ID)
                self.model = GenerativeModel("gemini-1.5-flash")
            except Exception as e:
                print(f"Warning: Failed to initialize Vertex AI: {e}. Falling back to Mock AI.")
                self.active = False

    async def get_coach_reply(self, message: str, latest_footprint: Dict[str, Any] = None) -> Dict[str, Any]:
        highest_cat = "general"
        if latest_footprint:
            highest_cat = latest_footprint.get("highestCategory", "general")

        if not self.active:
            return get_mock_reply(message, highest_cat, latest_footprint)

        try:
            prompt = f"""You are EcoTrack Coach, a friendly sustainability assistant.

Use the user's latest carbon footprint data to suggest practical actions.

User footprint:
- Monthly CO2e: {latest_footprint.get('monthlyKgCO2e') if latest_footprint else 'N/A'}
- Yearly CO2e: {latest_footprint.get('yearlyKgCO2e') if latest_footprint else 'N/A'}
- Eco score: {latest_footprint.get('score') if latest_footprint else 'N/A'}
- Highest category: {highest_cat}
- Breakdown: {latest_footprint.get('breakdown') if latest_footprint else 'N/A'}
- User message: {message}

Rules:
1. Be encouraging and non-judgmental.
2. Recommend 3 to 5 realistic actions.
3. Prioritize the highest-emission category.
4. Include estimated impact if possible.
5. Include difficulty and cost when useful.
6. Avoid fear-based or guilt-based language.
7. Do not claim exact scientific certainty.
8. Keep the answer beginner-friendly.
9. Do not ask for sensitive personal data.
10. If data is missing, state the assumption simply.

You MUST respond strictly in the following JSON format:
{{
  "reply": "Your summary and encouraging coaching explanation here.",
  "actions": [
    {{
      "title": "Switch off standby devices",
      "category": "electricity",
      "impact": "medium",
      "difficulty": "easy",
      "estimatedKgCO2eSaved": 5,
      "cost": "free",
      "timeframe": "this week"
    }}
  ]
}}
"""
            response = self.model.generate_content(prompt)
            # Parse response text as JSON
            resp_text = response.text.strip()
            # Handle markdown code block wrapper if present
            if resp_text.startswith("```json"):
                resp_text = resp_text[7:]
            if resp_text.endswith("```"):
                resp_text = resp_text[:-3]
            resp_text = resp_text.strip()
            
            data = json.loads(resp_text)
            return {
                "reply": data.get("reply", ""),
                "actions": data.get("actions", []),
                "source": "gemini"
            }
        except Exception as e:
            print(f"Vertex AI Gemini Call failed: {e}. Falling back to mock response.")
            return get_mock_reply(message, highest_cat, latest_footprint)

gemini_service = GeminiService()
