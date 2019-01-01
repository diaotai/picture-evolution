import { generateRandomIntBetweenZeroAndN, mutate, getRangeValue , IVariantParams } from '../utils/index';

export class Point {
    public static range = 256;
    public static IVariantParams: IVariantParams = {
        max: {
            rangeStart: 0,
            rangeEnd: 255,
            rate: 0.0008
        },
        mid: {
            range: 10,
            rate: 0.003
        },
        min: {
            range: 5,
            rate: 0.009
        }
    };
    public x: number;
    public y: number;

    constructor(x?: number, y?: number) {
        if (x && y) {
            this.x = this.getRangValue(x);
            this.y = this.getRangValue(y);
        } else {
            this.x = generateRandomIntBetweenZeroAndN(Point.range);
            this.y = generateRandomIntBetweenZeroAndN(Point.range);
        }
    }

    public mutate() {
        this.x = mutate(this.x, Point.IVariantParams);
        this.y = mutate(this.y, Point.IVariantParams);
    }

    private getRangValue(value: number) {
        return getRangeValue(0, Point.range - 1, value);
    }
}
