import { generateRandomIntBetweenZeroAndN, variant, getRangeValue ,VariantParams } from '../utils/index';

export class Point {
    public x: number;
    public y: number;
    public static range = 256;
    public static variantParams: VariantParams = {
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
    }    
    constructor (x?: number, y?: number) {
        if (x && y) {
            this.x = this.getRangValue(x);
            this.y = this.getRangValue(y);
        } else {
            this.x = generateRandomIntBetweenZeroAndN(Point.range);
            this.y = generateRandomIntBetweenZeroAndN(Point.range);
        }
    }

    public variant() {
        this.x = variant(this.x, Point.variantParams);
        this.y = variant(this.y, Point.variantParams);
    }

    private getRangValue(value: number) {
        return getRangeValue(0, Point.range - 1, value);
    }
}