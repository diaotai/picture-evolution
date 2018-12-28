import { rand, generateRandomInt, generateRandomIntRange } from './random';

interface MaxVariantParams {
    rangeStart: number;
    rangeEnd: number;
    rate: number;
}

interface NormalVariantParams {
    rate: number;
    range: number;
}

export interface VariantParams {
    max: MaxVariantParams,
    mid: NormalVariantParams,
    min: NormalVariantParams
}

export function variant(value: number, variantParams: VariantParams): number {
    let variantValue = value; 
    const { max, mid, min } = variantParams;
    const { rangeStart, rangeEnd } = max;
    if (rand(max.rate)) {
        variantValue = generateRandomInt(rangeStart, rangeEnd)
    }
    else if (rand(mid.rate)) {
        variantValue = Math.min(rangeEnd, Math.max(rangeStart, value + generateRandomIntRange(mid.range)));
    }
    else if (rand(min.rate)) {
        variantValue = Math.min(rangeEnd, Math.max(rangeStart, value + generateRandomIntRange(min.range)));
    }
    return variantValue;
}