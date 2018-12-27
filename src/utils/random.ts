export function generateRandomInt(start: number, end): number {
    const range = end - start;
    return Math.floor(start + Math.random() * range);
}

export function rand(seed: number) {
    return Math.random() < seed;
}