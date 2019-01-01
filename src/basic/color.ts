import { generateRandomIntBetweenZeroAndN, mutate, IVariantParams } from '../utils/index';

export class Color {
    public static opacity = 0.4;
    public static range = 256;
    public static IVariantParams: IVariantParams = {
        max: {
            rangeStart: 0,
            rangeEnd: Color.range,
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
    public rgb: IColorParams;

    public constructor(rgb?: IColorParams) {
        if (rgb) {
            this.rgb = {...rgb};
        } else {
            this.rgb = this.generateDefaultColorRGB();
        }
    }

    public get styleSheet(): string {
        const { r, g, b}  = this.rgb;
        return `rgb(${r},${g},${b})`;
    }

    public mutate() {
        const { r, g, b } = this.rgb;
        this.rgb.r = mutate(r, Color.IVariantParams);
        this.rgb.g = mutate(g, Color.IVariantParams);
        this.rgb.b = mutate(b, Color.IVariantParams);
    }

    private generateDefaultColorRGB(): IColorParams {
        return {
            r: generateRandomIntBetweenZeroAndN(Color.range),
            g: generateRandomIntBetweenZeroAndN(Color.range),
            b: generateRandomIntBetweenZeroAndN(Color.range),
        };
    }
}
export interface IColorParams {
    r: number;
    g: number;
    b: number;
}
