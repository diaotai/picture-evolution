import { Triangle } from './triangle';
import { colorDistributionCompare, pixelAverageCompare, psnrCompare, rgbAbsCompare, rgbPowCompare,
    ssimCompare, msSsimCompare ,weightCountCompare } from '../compare/index';
enum STATUS {
    COLOR,
    PIXEL,
    PSNR,
    ABS,
    POW,
    SSIM,
    MSSSIM,
    WEIGHT
}
export class Scallop {
    static compareMap = {
        [STATUS.COLOR]: colorDistributionCompare,
        [STATUS.PIXEL]: pixelAverageCompare,
        [STATUS.PSNR]: psnrCompare,
        [STATUS.ABS]: rgbAbsCompare,
        [STATUS.POW]: rgbPowCompare,
        [STATUS.SSIM]: ssimCompare,
        [STATUS.MSSSIM]: msSsimCompare,
        [STATUS.WEIGHT]: weightCountCompare
    }

    public status: STATUS = STATUS.POW;
    public triangleCount: number;
    public canvasContext: CanvasRenderingContext2D;
    public triangles: Triangle[] = [];
    public parent: Scallop;
    public matchRate: number;

    private targetImageData: ImageData;

    constructor(triangleCount: number, canvasContextx: CanvasRenderingContext2D, targetImageData: ImageData, parent?: Scallop) {
        if (parent) {
            this.triangleCount = parent.triangleCount;
            for (let i = 0; i < parent.triangles.length; i++) {
                this.triangles[i] = parent.triangles[i].clone();
            }
            this.canvasContext = canvasContextx;
            this.targetImageData =targetImageData;
            this.mutated();
        } else {
            this.triangleCount = triangleCount;
            this.canvasContext = canvasContextx;
            this.targetImageData = targetImageData;
            this.initTrianglesAsParent();
        }
    }

    public clacMatchRate() {
        const compare = Scallop.compareMap[this.status];
        const targetImageData = this.targetImageData;
        const currentData = this.canvasContext.getImageData(0, 0, 256, 256);
        this.matchRate = compare(targetImageData, currentData);
    }

    public draw() {
        this.canvasContext.clearRect(0, 0, 256, 256);
        for (const triangle of this.triangles) {
            triangle.draw(this.canvasContext);
        }
        this.clacMatchRate();
    }

    public mate(scallop: Scallop) {
        const triangles: Triangle[] = [];
        for (let i = 0; i < this.triangleCount; i++) {
            const triangle = Math.random() > 0.5 ? this.triangles[i] : scallop.triangles[i];
            triangles.push(triangle.clone());
        }
        this.triangles = triangles;
        scallop.triangles = triangles.map((triangle) => triangle.clone());
        this.mutated();
        scallop.mutated();
    }

    private initTrianglesAsParent() {
        const triangles: Triangle[] = [];
        for (let i = 0; i < this.triangleCount; i ++) {
            triangles.push(new Triangle());
        }
        this.triangles = triangles;
    }

    private mutated() {
        for (let i = 0; i < this.triangleCount; i ++) {
            const parentTriangle = this.triangles[i];
            const childTriangle = parentTriangle.clone();
            childTriangle.mutate();
            this.triangles[i] = childTriangle;
        }
    }
}
