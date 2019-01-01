import { generateRandomInt, generateRandomIntBetweenRange, getBooleanByRand } from './random';

export function mutate(value: number, variantParams: IVariantParams): number {
    let variantValue = value;
    const { max, mid, min } = variantParams;
    const { rangeStart, rangeEnd } = max;
    if (getBooleanByRand(max.rate)) {
        variantValue = generateRandomInt(rangeStart, rangeEnd);
    } else if (getBooleanByRand(mid.rate)) {
        variantValue = Math.min(rangeEnd, Math.max(rangeStart, value + generateRandomIntBetweenRange(mid.range)));
    } else if (getBooleanByRand(min.rate)) {
        variantValue = Math.min(rangeEnd, Math.max(rangeStart, value + generateRandomIntBetweenRange(min.range)));
    }
    return variantValue;
}

export interface IVariantParams {
    max: IMaxVariantParams;
    mid: INormalVariantParams;
    min: INormalVariantParams;
}

interface IMaxVariantParams {
    rangeStart: number;
    rangeEnd: number;
    rate: number;
}

interface INormalVariantParams {
    rate: number;
    range: number;
}
