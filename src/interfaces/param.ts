export interface IParams {
    trianglesCount: number;
    colorAlpha: number;
    pointFactors: IMuterFactors;
    colorFactors: IMuterFactors;
}

export interface IMuterFactors {
    max: IRangeMuterFactor;
    mid: ISelfMuterFactor;
    min: ISelfMuterFactor;
}

interface IRangeMuterFactor {
    start: number;
    end: number;
    rate: number;
}

interface ISelfMuterFactor {
    range: number;
    rate: number;
}
