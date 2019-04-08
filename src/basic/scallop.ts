import { Triangle } from './triangle';

export class Scallop {
    public triangleCount: number;
    public canvasContext: CanvasRenderingContext2D;
    public triangles: Triangle[] = [];
    public parent: Scallop;

    constructor(triangleCount: number, canvasContextx: CanvasRenderingContext2D, parent?: Scallop) {
        if (parent) {
            this.triangleCount = parent.triangleCount;
            this.canvasContext = parent.canvasContext;
            this.triangles = parent.triangles;
            this.mutated();
        } else {
            this.triangleCount = triangleCount;
            this.canvasContext = canvasContextx;
            this.initTrianglesAsParent();
        }
    }

    public clacMatchRate(targetImageData: ImageData): number {
        this.draw();
        let matchRate = 0;
        const currentData = this.canvasContext.getImageData(0, 0, 256, 256);
        for (let i = 0; i < targetImageData.data.length; i++) {
            matchRate += Math.pow(targetImageData.data[i] - currentData.data[i] , 2);
        }
        return matchRate;
    }

    public draw() {
        this.canvasContext.clearRect(0, 0, 256, 256);
        for (const triangle of this.triangles) {
            triangle.draw(this.canvasContext);
        }
    }

    public mate(scallop: Scallop) {
        const triangles: Triangle[] = [];
        for (let i = 0; i < this.triangleCount; i++) {
            const triangle = Math.random() > 0.5 ? this.triangles[i] : scallop.triangles[i];
            triangles.push(triangle);
        }
        this.triangles = triangles;
        this.mutated();
        scallop.triangles = triangles;
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
            const childTriangle = new Triangle(parentTriangle.points, parentTriangle.color);
            childTriangle.mutate();
            this.triangles[i] = childTriangle;
        }
    }
}
