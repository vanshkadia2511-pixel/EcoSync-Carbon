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

// V2 Feature: Dynamic LLM-driven Coaching
export const generateLLMRecommendations = async (
  recentActivities: Activity[],
  currentEcoScore: number
): Promise<Recommendation[]> => {
  // In a real application, this would securely call an LLM API (e.g., Gemini)
  // with the user's recent context to generate hyper-personalized coaching.
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mocking an intelligent response based on the presence of certain activities
      const highEmissionActivities = recentActivities.filter(a => a.emissionKg > 5);
      
      if (highEmissionActivities.length > 0) {
        resolve([
          {
            id: `llm_rec_${Date.now()}`,
            title: 'Target Your Highest Emitters',
            category: highEmissionActivities[0].category,
            description: `I noticed your recent ${highEmissionActivities[0].category.toLowerCase()} activity had a high carbon cost. Let's work on exploring greener alternatives this week!`,
            estimatedSavingKg: highEmissionActivities[0].emissionKg * 0.5,
            difficulty: 'Hard',
            moneySaving: 15.0,
            status: 'Pending'
          }
        ]);
      } else {
        resolve([
          {
            id: `llm_rec_${Date.now()}_great`,
            title: 'Keep Up the Great Work!',
            category: 'General',
            description: `Your Eco-Score of ${currentEcoScore} is looking fantastic! No major red flags this week. Challenge yourself to a zero-waste day tomorrow.`,
            estimatedSavingKg: 1.0,
            difficulty: 'Medium',
            moneySaving: 5.0,
            status: 'Pending'
          }
        ]);
      }
    }, 1500);
  });
};
