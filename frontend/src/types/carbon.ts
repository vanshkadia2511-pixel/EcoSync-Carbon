export type TransportMode = 'car' | 'bus' | 'train' | 'bike' | 'walk';
export type DietType = 'vegan' | 'vegetarian' | 'omnivore' | 'meat-heavy';
export type ShoppingLevel = 'low' | 'medium' | 'high';
export type CarbonCategory = 'transport' | 'diet' | 'electricity' | 'shopping' | 'flights';

export interface CarbonAuditInput {
  sessionId: string;
  transport: {
    mode: TransportMode;
    kmPerWeek: number;
  };
  diet: DietType;
  electricityKwhPerMonth: number;
  shoppingLevel: ShoppingLevel;
  flightKmPerMonth?: number;
  householdSize?: number;
}

export interface FootprintBreakdown {
  transport: number;
  diet: number;
  electricity: number;
  shopping: number;
  flights: number;
}

export interface FootprintRecord {
  recordId: string;
  sessionId: string;
  createdAt: string;
  monthlyKgCO2e: number;
  yearlyKgCO2e: number;
  score: number;
  highestCategory: CarbonCategory;
  breakdown: FootprintBreakdown;
  inputs: CarbonAuditInput;
  topActions: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: ActionItem[];
  timestamp: string;
}

export interface ActionItem {
  title: string;
  category: CarbonCategory;
  impact: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedKgCO2eSaved: number;
  cost: string;
  timeframe?: string;
}

export interface ChallengeRecord {
  challengeId: string;
  sessionId: string;
  title: string;
  description: string;
  category: CarbonCategory | 'general';
  estimatedImpactKg: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  rewardSeeds: number;
  progress: number;
  target: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}
