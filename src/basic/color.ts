import { generateRandomIntBetweenZeroAndN, variant, VariantParams } from '../utils/index';

export class Color {
    public rgb: ColorParams;
    public static opacity = 0.4;
    public static range = 256;
    public static variantParams: VariantParams = {
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
    }

    public constructor(rgb?: ColorParams) {
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

    public variant() {
        const { r, g, b } = this.rgb;
        this.rgb.r = variant(r, Color.variantParams);
        this.rgb.g = variant(g, Color.variantParams);
        this.rgb.b = variant(b, Color.variantParams);
    }

    private generateDefaultColorRGB(): ColorParams {
        return {
            r: generateRandomIntBetweenZeroAndN(Color.range),
            g: generateRandomIntBetweenZeroAndN(Color.range),
            b: generateRandomIntBetweenZeroAndN(Color.range)
        }
    }
}



export interface ColorParams {
    r: number;
    g: number;
    b: number;
}