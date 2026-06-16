import { ActivityCategory, Recommendation, Activity } from '../types';

// Simple rule-based recommendations for MVP
export const generateRecommendations = (highestCategory: ActivityCategory): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  if (highestCategory === 'Transport') {
    recommendations.push({
      id: 'rec_trans_1',
      title: 'Swap to Public Transport',
      category: 'Transport',
      description: 'Transport is your biggest source this week. Try public transport twice to save around 4.5 kg CO2e.',
      estimatedSavingKg: 4.5,
      difficulty: 'Medium',
      moneySaving: 5.0, // mock saving
      status: 'Pending'
    });
  } else if (highestCategory === 'Food') {
    recommendations.push({
      id: 'rec_food_1',
      title: 'Meatless Monday',
      category: 'Food',
      description: 'Swap 2 meat meals for plant-based alternatives this week.',
      estimatedSavingKg: 8.0,
      difficulty: 'Easy',
      moneySaving: 12.0,
      status: 'Pending'
    });
  } else if (highestCategory === 'Energy') {
    recommendations.push({
      id: 'rec_energy_1',
      title: 'Unplug Devices',
      category: 'Energy',
      description: 'Switch off unused appliances for 2 hours daily.',
      estimatedSavingKg: 2.5,
      difficulty: 'Easy',
      moneySaving: 2.0,
      status: 'Pending'
    });
  } else {
    recommendations.push({
      id: 'rec_general_1',
      title: 'Reduce Online Shopping',
      category: 'Shopping',
      description: 'Consolidate your online orders into a single delivery this week.',
      estimatedSavingKg: 6.0,
      difficulty: 'Medium',
      moneySaving: 20.0,
      status: 'Pending'
    });
  }

  return recommendations;
};

export const generateLLMRecommendations = async (
  recentActivities: Activity[],
  currentEcoScore: number
): Promise<Recommendation[]> => {
  try {
    const response = await fetch('/api/coach', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recentActivities, currentEcoScore })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    const data = await response.json();
    return data.recommendations || [];
  } catch (error) {
    console.error('Error fetching LLM recommendations:', error);
    // Fallback if API fails
    return [];
  }
};
