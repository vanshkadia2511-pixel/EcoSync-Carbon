import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const VALID_CATEGORIES = ['Transport', 'Food', 'Energy', 'Shopping', 'General'];
const VALID_DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recentActivities, currentEcoScore } = body;

    // --- Input validation ---
    if (currentEcoScore !== undefined) {
      const score = Number(currentEcoScore);
      if (!Number.isFinite(score) || score < 0 || score > 100) {
        return NextResponse.json(
          { error: 'currentEcoScore must be a number between 0 and 100' },
          { status: 400 }
        );
      }
    }

    if (recentActivities !== undefined && !Array.isArray(recentActivities)) {
      return NextResponse.json(
        { error: 'recentActivities must be an array' },
        { status: 400 }
      );
    }

    // Sanitize activities — only forward expected fields to AI (prevent prompt injection)
    const safeActivities: { category: string; type: string; emissionKg: number }[] = (recentActivities ?? [])
      .slice(0, 20) // Limit to 20 most recent
      .map((a: Record<string, unknown>) => ({
        category: String(a.category ?? '').substring(0, 50),
        type: String(a.type ?? '').substring(0, 50),
        emissionKg: Number(a.emissionKg) || 0,
      }));


    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === '') {
      // Fallback mock logic if no API key is provided
      console.warn('No GEMINI_API_KEY provided. Using mock recommendations.');
      const highEmissionActivities = safeActivities.filter((a) => a.emissionKg > 5);

      const mockResponse = highEmissionActivities.length > 0
        ? [{
            id: `llm_rec_${Date.now()}`,
            title: 'Target Your Highest Emitters',
            category: highEmissionActivities[0].category || 'General',
            description: `Your recent ${(highEmissionActivities[0].category || 'activity').toLowerCase()} had a high carbon cost. Let's explore greener alternatives this week!`,
            estimatedSavingKg: Number((highEmissionActivities[0].emissionKg * 0.5).toFixed(2)),
            difficulty: 'Hard',
            moneySaving: 15.0,
            status: 'Pending',
          }]
        : [{
            id: `llm_rec_${Date.now()}_great`,
            title: 'Keep Up the Great Work!',
            category: 'General',
            description: `Your Eco-Score of ${currentEcoScore ?? 'N/A'} is looking fantastic! No major red flags this week. Challenge yourself to a zero-waste day tomorrow.`,
            estimatedSavingKg: 1.0,
            difficulty: 'Medium',
            moneySaving: 5.0,
            status: 'Pending',
          }];

      return NextResponse.json({ recommendations: mockResponse });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are EcoTrack Coach, a friendly sustainability assistant.
      Use the user's latest carbon footprint data to suggest practical actions.
      
      Context:
      Current Eco-Score: ${Number(currentEcoScore) || 0}
      Recent Activities (sanitized): ${JSON.stringify(safeActivities, null, 2)}
      
      Rules:
      - Be encouraging, not judgmental.
      - Recommend exactly 1 realistic action.
      - Return the recommendation in strict JSON format.
      - The JSON must match this structure exactly:
        {
          "title": "String",
          "category": "String (one of: Transport, Food, Energy, Shopping, General)",
          "description": "String",
          "estimatedSavingKg": Number,
          "difficulty": "String (one of: Easy, Medium, Hard)",
          "moneySaving": Number
        }
      - Do not include markdown formatting like \`\`\`json or \`\`\`. Just raw JSON string.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    let recommendationData;

    try {
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      recommendationData = JSON.parse(cleanJson);
    } catch (e) {
      console.error('Failed to parse Gemini response', responseText);
      throw new Error('Invalid response format from AI');
    }

    // Validate and sanitize Gemini output before returning
    const recommendation = {
      id: `llm_rec_${Date.now()}`,
      title: String(recommendationData.title ?? 'Eco Tip').substring(0, 200),
      category: VALID_CATEGORIES.includes(recommendationData.category)
        ? recommendationData.category
        : 'General',
      description: String(recommendationData.description ?? '').substring(0, 1000),
      estimatedSavingKg: Number(recommendationData.estimatedSavingKg) || 0,
      difficulty: VALID_DIFFICULTIES.includes(recommendationData.difficulty)
        ? recommendationData.difficulty
        : 'Medium',
      moneySaving: Number(recommendationData.moneySaving) || 0,
      status: 'Pending',
    };

    return NextResponse.json({ recommendations: [recommendation] });
  } catch (error) {
    console.error('Coach API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations. Please try again later.' },
      { status: 500 }
    );
  }
}
