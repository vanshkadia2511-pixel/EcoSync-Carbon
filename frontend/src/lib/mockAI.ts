// Rule-based mock AI — works without any cloud credentials
import type { CarbonCategory, ActionItem, FootprintRecord } from '../types/carbon';

const MOCK_REPLIES: Record<CarbonCategory | 'general', string> = {
  electricity: `Your biggest opportunity is electricity. This week, try switching off standby devices, reducing AC use by 1 hour per day, and using natural light during daytime. These actions are free and easy to start.`,
  transport: `Transport is your highest-impact area. Try taking public transport twice this week, carpooling when possible, or cycling for short trips. Even one car-free day can make a meaningful difference.`,
  diet: `Diet is your biggest emission source. Adding 2–3 plant-based meals per week is one of the most effective changes you can make. You don't need to go fully vegan — small, consistent swaps add up.`,
  shopping: `Shopping is your top category. Try a one-week no-buy challenge for non-essential items. When you do shop, choose durable, second-hand, or locally-made products. Repair before replacing.`,
  flights: `Flights are your largest source of emissions. For short distances, consider trains or buses as an alternative. If you must fly, choose direct routes and offset where possible.`,
  general: `You're doing well across the board! Your biggest next step is to focus on consistency — small daily habits like turning off unused lights, choosing local food, and reducing car trips all compound over time.`,
};

const MOCK_ACTIONS: Record<CarbonCategory | 'general', ActionItem[]> = {
  electricity: [
    { title: 'Switch off standby devices', category: 'electricity', impact: 'medium', difficulty: 'easy', estimatedKgCO2eSaved: 5, cost: 'free', timeframe: 'this week' },
    { title: 'Reduce AC usage by 1 hour per day', category: 'electricity', impact: 'medium', difficulty: 'easy', estimatedKgCO2eSaved: 8, cost: 'free', timeframe: 'this week' },
    { title: 'Use LED bulbs', category: 'electricity', impact: 'low', difficulty: 'easy', estimatedKgCO2eSaved: 2, cost: '₹200 one-time', timeframe: 'this month' },
  ],
  transport: [
    { title: 'Take public transport 2 days/week', category: 'transport', impact: 'high', difficulty: 'medium', estimatedKgCO2eSaved: 12, cost: 'free', timeframe: 'this week' },
    { title: 'Cycle for trips under 5 km', category: 'transport', impact: 'medium', difficulty: 'medium', estimatedKgCO2eSaved: 8, cost: 'free', timeframe: 'this week' },
    { title: 'Carpool with 1 colleague', category: 'transport', impact: 'medium', difficulty: 'easy', estimatedKgCO2eSaved: 5, cost: 'free', timeframe: 'this week' },
  ],
  diet: [
    { title: 'Try 2 plant-based meals this week', category: 'diet', impact: 'high', difficulty: 'easy', estimatedKgCO2eSaved: 10, cost: 'free', timeframe: 'this week' },
    { title: 'Swap beef for chicken once', category: 'diet', impact: 'medium', difficulty: 'easy', estimatedKgCO2eSaved: 5, cost: 'free', timeframe: 'this week' },
    { title: 'Reduce food waste by meal planning', category: 'diet', impact: 'low', difficulty: 'easy', estimatedKgCO2eSaved: 3, cost: 'free', timeframe: 'this week' },
  ],
  shopping: [
    { title: '1 week no-buy challenge', category: 'shopping', impact: 'high', difficulty: 'medium', estimatedKgCO2eSaved: 15, cost: 'free', timeframe: 'this week' },
    { title: 'Repair instead of replace', category: 'shopping', impact: 'medium', difficulty: 'easy', estimatedKgCO2eSaved: 8, cost: 'free', timeframe: 'ongoing' },
    { title: 'Buy second-hand next purchase', category: 'shopping', impact: 'medium', difficulty: 'easy', estimatedKgCO2eSaved: 6, cost: 'free', timeframe: 'next purchase' },
  ],
  flights: [
    { title: 'Replace 1 short flight with train', category: 'flights', impact: 'high', difficulty: 'medium', estimatedKgCO2eSaved: 50, cost: 'may save money', timeframe: 'next trip' },
    { title: 'Combine trips to reduce flight count', category: 'flights', impact: 'high', difficulty: 'medium', estimatedKgCO2eSaved: 30, cost: 'free', timeframe: 'planning' },
  ],
  general: [
    { title: 'Log your activities daily', category: 'transport', impact: 'low', difficulty: 'easy', estimatedKgCO2eSaved: 0, cost: 'free', timeframe: 'daily' },
    { title: 'Complete a weekly challenge', category: 'electricity', impact: 'medium', difficulty: 'easy', estimatedKgCO2eSaved: 5, cost: 'free', timeframe: 'this week' },
  ],
};

export function getMockReply(
  message: string,
  footprint?: FootprintRecord
): { reply: string; actions: ActionItem[]; source: 'mock' } {
  const highest = (footprint?.highestCategory ?? 'general') as CarbonCategory | 'general';

  // Simple keyword matching for more relevant responses
  const lowerMsg = message.toLowerCase();
  let category: CarbonCategory | 'general' = highest;

  if (lowerMsg.includes('transport') || lowerMsg.includes('car') || lowerMsg.includes('travel'))
    category = 'transport';
  else if (lowerMsg.includes('food') || lowerMsg.includes('diet') || lowerMsg.includes('meal'))
    category = 'diet';
  else if (lowerMsg.includes('electric') || lowerMsg.includes('energy') || lowerMsg.includes('power'))
    category = 'electricity';
  else if (lowerMsg.includes('shop') || lowerMsg.includes('buy') || lowerMsg.includes('purchase'))
    category = 'shopping';
  else if (lowerMsg.includes('flight') || lowerMsg.includes('fly'))
    category = 'flights';

  return {
    reply: MOCK_REPLIES[category],
    actions: MOCK_ACTIONS[category],
    source: 'mock',
  };
}
