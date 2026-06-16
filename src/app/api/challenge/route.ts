import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === '') {
      // Mock challenge fallback
      return NextResponse.json({
        challenge: {
          id: `chal_${Date.now()}`,
          title: "Zero Food Waste Week",
          description: "Plan your meals and completely eliminate food waste this week.",
          target: 7,
          progress: 0,
          rewardSeeds: 250,
          estimatedSavingKg: 12.5,
          status: 'Available'
        }
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are EcoTrack, a sustainability assistant. 
      Generate a realistic 7-day carbon reduction challenge.
      
      Return the challenge in strict JSON format.
      The JSON must match this structure exactly:
      {
        "title": "String",
        "description": "String",
        "target": 7,
        "rewardSeeds": Number (between 100 and 500),
        "estimatedSavingKg": Number
      }
      Do not include markdown formatting like \`\`\`json. Just raw JSON string.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleanJson);

    return NextResponse.json({
      challenge: {
        id: `chal_${Date.now()}`,
        title: data.title,
        description: data.description,
        target: data.target || 7,
        progress: 0,
        rewardSeeds: data.rewardSeeds,
        estimatedSavingKg: data.estimatedSavingKg,
        status: 'Available'
      }
    });
  } catch (error) {
    console.error('Challenge API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate challenge' },
      { status: 500 }
    );
  }
}
