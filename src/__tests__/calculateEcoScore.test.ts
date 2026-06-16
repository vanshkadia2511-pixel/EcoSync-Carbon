import { describe, it, expect } from 'vitest';
import { calculateEcoScore } from '@/lib/calculateEcoScore';

describe('calculateEcoScore', () => {
  it('returns 100 when emissions are 0', () => {
    const score = calculateEcoScore(0, 50);
    expect(score).toBe(100);
  });

  it('returns 60 when emissions equal the weekly budget (40% penalty)', () => {
    const score = calculateEcoScore(50, 50);
    expect(score).toBe(60);
  });

  it('returns 0 when emissions far exceed budget', () => {
    const score = calculateEcoScore(10000, 50);
    expect(score).toBe(0);
  });

  it('never exceeds 100 even with large bonuses', () => {
    const score = calculateEcoScore(0, 50, 100, 100, 100);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('never goes below 0', () => {
    const score = calculateEcoScore(100000, 1);
    expect(score).toBeGreaterThanOrEqual(0);
  });

  it('increases with streak bonus', () => {
    const base = calculateEcoScore(20, 50, 0);
    const withStreak = calculateEcoScore(20, 50, 5);
    expect(withStreak).toBeGreaterThan(base);
  });

  it('increases with challenge bonus', () => {
    const base = calculateEcoScore(20, 50, 0, 0);
    const withChallenge = calculateEcoScore(20, 50, 0, 5);
    expect(withChallenge).toBeGreaterThan(base);
  });

  it('increases with low-carbon activity bonus', () => {
    const base = calculateEcoScore(20, 50, 0, 0, 0);
    const withBonus = calculateEcoScore(20, 50, 0, 0, 5);
    expect(withBonus).toBeGreaterThan(base);
  });

  it('returns an integer (Math.round applied)', () => {
    const score = calculateEcoScore(33, 50);
    expect(Number.isInteger(score)).toBe(true);
  });

  it('applies all bonuses correctly', () => {
    // penalty = (20/50)*40 = 16, bonuses = 3+2+1 = 6, score = 100-16+6 = 90
    const score = calculateEcoScore(20, 50, 3, 2, 1);
    expect(score).toBe(90);
  });

  it('higher emissions lead to lower score', () => {
    const low = calculateEcoScore(10, 50);
    const high = calculateEcoScore(40, 50);
    expect(low).toBeGreaterThan(high);
  });
});
