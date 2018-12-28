import { Point } from './point';
import { Color } from './color';

export class Triangle {
    public points: Point[] = [];
    public color!: Color;

    constructor(points?: Point[], color?: Color) {
        if (points && color) {
            this.points = points.map((point) => {
                return new Point(point.x, point.y);
            });
            this.color = new Color(color.rgb);
        } else {
            for (let i = 0; i < 3; i++) {
                this.points[i] = new Point();
            } 
            this.color = new Color();
        }
    }

    public variant() {
        for (const point of this.points) {
            point.variant();
        }
        this.color.variant();
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = this.color.styleSheet;
        ctx.moveTo(this.points[0].x, this.points[0].y);
        ctx.lineTo(this.points[1].x, this.points[1].y);
        ctx.lineTo(this.points[2].x, this.points[2].y);
        ctx.fill();
        ctx.closePath();
    }
}