import {calculateRewardPoints} from '../utils/rewardCalculator'

describe('calculateRewardPoints', () => {
  test('returns 0 for amount <= 50', () => {
    expect(calculateRewardPoints(50)).toBe(0);
  });

  test('returns correct for amount between 50 and 100', () => {
    expect(calculateRewardPoints(80)).toBe(30);
  });

  test('returns correct for amount > 100', () => {
    expect(calculateRewardPoints(120)).toBe(90);
  });

  test('handles fractional amounts', () => {
    expect(calculateRewardPoints(120.75)).toBe(91);
  });

  test('returns 0 for negative values', () => {
    expect(calculateRewardPoints(-10)).toBe(0);
  });

  test('returns 0 for NaN or undefined', () => {
    expect(calculateRewardPoints(NaN)).toBe(0);
    expect(calculateRewardPoints(undefined)).toBe(0);
  });
});
