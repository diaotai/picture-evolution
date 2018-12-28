import { getBooleanByRand, generateRandomInt, generateRandomIntBetweenRange } from './random';

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
    if (getBooleanByRand(max.rate)) {
        variantValue = generateRandomInt(rangeStart, rangeEnd)
    }
    else if (getBooleanByRand(mid.rate)) {
        variantValue = Math.min(rangeEnd, Math.max(rangeStart, value + generateRandomIntBetweenRange(mid.range)));
    }
    else if (getBooleanByRand(min.rate)) {
        variantValue = Math.min(rangeEnd, Math.max(rangeStart, value + generateRandomIntBetweenRange(min.range)));
    }
    return variantValue;
}