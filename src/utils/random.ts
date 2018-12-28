export function generateRandomInt(start: number, end): number {
    const range = end - start;
    return Math.floor(start + Math.random() * range);
}

export function generateRandomIntBetweenZero(end: number): number {
    return generateRandomInt(0, end);
}

export function generateRandomIntRange(range: number): number {
    return generateRandomInt( -range, range);
}

export function rand(seed: number) {
    return Math.random() < seed;
}