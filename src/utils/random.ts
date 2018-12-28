export function generateRandomInt(start: number, end): number {
    const range = end - start;
    if (range <= 0) {
        return 0;
    }
    return Math.floor(start + Math.random() * range);
}

export function generateRandomIntBetweenZeroAndN(end: number): number {
    return generateRandomInt(0, end);
}

export function generateRandomIntBetweenRange(range: number): number {
    return generateRandomInt(-range, range);
}

export function getBooleanByRand(seed: number): boolean {
    if (seed > 1 || seed < 0) {
        return false;
    }
    return Math.random() < seed;
}