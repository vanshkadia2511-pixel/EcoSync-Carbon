import { ActivityCategory } from '../types';

export interface ParsedItem {
  name: string;
  inferredCategory: ActivityCategory;
  inferredType: string;
}

export const parseReceiptText = (rawText: string): ParsedItem[] => {
  const items: ParsedItem[] = [];
  const textLower = rawText.toLowerCase();

  // Keyword heuristic matching mapping receipt lines to our carbon engine factors
  if (textLower.includes('chicken') || textLower.includes('poultry')) {
    items.push({ name: 'Chicken', inferredCategory: 'Food', inferredType: 'chicken_meal' });
  }
  if (textLower.includes('beef') || textLower.includes('steak') || textLower.includes('pork')) {
    items.push({ name: 'Red Meat', inferredCategory: 'Food', inferredType: 'meat_heavy_meal' });
  }
  if (textLower.includes('tofu') || textLower.includes('lentils') || textLower.includes('beans')) {
    items.push({ name: 'Plant Protein', inferredCategory: 'Food', inferredType: 'plant_based_meal' });
  }
  if (textLower.includes('cheese') || textLower.includes('milk') || textLower.includes('yogurt')) {
    items.push({ name: 'Dairy', inferredCategory: 'Food', inferredType: 'vegetarian_meal' });
  }
  
  // Fallback for general shopping
  if (items.length === 0 && textLower.includes('total')) {
    items.push({ name: 'General Groceries', inferredCategory: 'Shopping', inferredType: 'medium_purchase' });
  }

  return items;
};

export const parseUtilityBillText = (rawText: string): number | null => {
  const textLower = rawText.toLowerCase();
  
  // RegEx to find kWh usage values in typical utility bills
  const kwhMatch = textLower.match(/(\d+(?:\.\d+)?)\s*kwh/);
  
  if (kwhMatch && kwhMatch[1]) {
    return parseFloat(kwhMatch[1]);
  }
  return null;
};
