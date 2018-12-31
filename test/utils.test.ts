import { getBooleanByRand, generateRandomIntBetweenRange,
    generateRandomIntBetweenZeroAndN, generateRandomInt } from '../src/utils/index';

test('getBooleanByRand will be false when seed is not between 0 and 1', () => {
    expect(getBooleanByRand(-0.1)).toBeFalsy();
    expect(getBooleanByRand(1.1)).toBeFalsy();
});

test('generateRandomIntBetweenRange will generate value in range', () => {
    const value = generateRandomIntBetweenRange(10);
    expect(value).toBeLessThan(10);
    expect(value).toBeGreaterThanOrEqual(-10);
    expect(value).toBe(Math.floor(value));
    expect(generateRandomIntBetweenRange(0)).toBe(0);
    expect(generateRandomIntBetweenRange(-1)).toBe(0);
});

test('generateRandomIntBetweenZeroAndN', () => {
    const value = generateRandomIntBetweenZeroAndN(10);
    expect(value).toBeLessThan(10);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBe(Math.floor(value));
    expect(generateRandomIntBetweenZeroAndN(0)).toBe(0);
    expect(generateRandomIntBetweenZeroAndN(-3)).toBe(0);
});

test('generateRandomInt should produce a number between start and end', () => {
    const value = generateRandomInt(-5, 10);
    expect(value).toBeLessThan(10);
    expect(value).toBeGreaterThanOrEqual(-5);
    expect(value).toBe(Math.floor(value));
    expect(generateRandomInt(0, 0)).toBe(0);
    expect(generateRandomInt(10, -5)).toBe(0);
});
