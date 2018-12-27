
import * as utils from './utils/index';
import { generateRandomInt } from './utils/index';

let run = true;

function drawImage(canvas: HTMLCanvasElement, src: string, alt = '') {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const image = new Image();
    image.onload = () => {
        context.drawImage(image, 0, 0);
    }
    image.src = src;
    image.alt = alt;
}

class Color {
    public values: number[] = [];

    public constructor(values: number[] = []) {
        if (values.length === 3) {
            this.values = [...values];
        } else {
            for (let i = 0; i < 3; i++) {
                this.values[i] = utils.generateRandomInt(0, 255);
            }
        }
    }

    public get styleDescription(): string {
        return `rgb(${this.values[0]}, ${this.values[1]},${this.values[2]})`
    }

    public variant(): Color {
        const maxVariant = {
            rangeStart: 0,
            rangeEnd: 255,
            rate: 0.008
        }
        const midVariant = {
            range: 10,
            rate: 0.03
        }
        const minVariant = {
            range: 5,
            rate: 0.09
        }
        const values: number[] = [];
        for (let i of this.values) {
            values.push(variant(i, maxVariant, midVariant, minVariant));
        }
        return new Color(values);
    }
}

class Point {
    public x: number;
    public y: number;
    public static maxXRange = 255;
    public static maxYRange = 255;
    public static max_mutate_rate = 0.0008;
    public static mid_mutate_rate = 0.003;
    public static min_mutate_rate = 0.009;    
    constructor (x?: number, y?: number) {
        if (x !== undefined) {
            this.x = x;
            this.y = y;
        } else {
            this.x = utils.generateRandomInt(0, Point.maxXRange);
            this.y = utils.generateRandomInt(0, Point.maxYRange);
        }
    }

    public variant(): Point {
        const maxVariant: MaxVariantParams = {
            rangeStart: 0,
            rangeEnd: Point.maxXRange,
            rate: Point.max_mutate_rate
        };
        const midVariant: NormalVariantParams = {
            rate: Point.mid_mutate_rate,
            range: 10
        }
        const minVariant: NormalVariantParams = {
            rate: Point.min_mutate_rate,
            range: 5
        }
        const x = variant(this.x, maxVariant, midVariant, minVariant);
        const y = variant(this.y, maxVariant, midVariant, minVariant);
        return new Point(x, y);
    }
}

class Triangle {
    public points: Point[] = [];
    public color: Color;
    public ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, points?: Point[], color?: Color) {
        this.ctx = ctx;
        this.ctx.globalAlpha = 0.35;
        if (points && color) {
            this.points = [...points];
            this.color = color;
        } else {
            this.initTriangle();
        }
    }

    public initTriangle() {
        this.points[0] = new Point();
        this.points[1] = new Point();
        this.points[2] = new Point();
        this.color = new Color();
    }

    public variant(): Triangle {
        const triangle = new Triangle(this.ctx, this.points, this.color);
        triangle.color = triangle.color.variant();
        for (let i = 0; i < 3; i++) {
            triangle.points[i] = triangle.points[i].variant();
        }
        return triangle;
    }

    public draw() {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.color.styleDescription;
        ctx.moveTo(this.points[0].x, this.points[0].y);
        ctx.lineTo(this.points[1].x, this.points[1].y);
        ctx.lineTo(this.points[2].x, this.points[2].y);
        ctx.fill();
        ctx.closePath();
    }
}

class Evolution {
    public triangles: Triangle[] = [];
    public canvas!: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public count: number = 80;
    public targetData: ImageData;
    public matchRate: number;
    constructor(canvas: HTMLCanvasElement, targetData: ImageData) {
        this.canvas = canvas;
        this.targetData = targetData;
        this.ctx = canvas.getContext("2d");
        for (let i = 0; i < this.count; i++) {
            const triangle = new Triangle(this.ctx);
            this.triangles.push(triangle);
        }
        this.draw();
        this.matchRate = this.calcMatchRate();
    }

    public draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.triangles.forEach((triangle) => {
            triangle.draw();
        })
    }

    public calcMatchRate(): number {
        let matchRate = 0;
        var resultMatchRate = this.ctx.getImageData(0, 0, 256, 256);
        for(var i = 0; i < resultMatchRate.data.length; i++){
            if(i%3==0){
                continue;
            }
            matchRate += (this.targetData.data[i] - resultMatchRate.data[i]) * (this.targetData.data[i] - resultMatchRate.data[i]);
        }
        console.log(matchRate, '!!!!');
        return matchRate;
        // const pageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        // let matchRate = 0;
        // for (let i = 0; i < this.targetData.data.length; i++) {
        //     matchRate += Math.pow(this.targetData.data[i] - pageData.data[i], 2);
        // }
        // return matchRate;
    }

    public variant() {
        const backupData = this.triangles;
        const newData: Triangle[] = [];
        this.triangles.forEach((triangle) => {
            newData.push(triangle.variant());
        })
        this.triangles = newData;
        this.draw();
        const matchRate = this.calcMatchRate();
        this.matchRate = matchRate;

        console.log(matchRate > this.matchRate)

        if (matchRate > this.matchRate) {
            this.triangles = backupData;
            this.draw();
        } else {
            this.matchRate = matchRate;
        }
    }
}

function init(): void {
    const stopButton: HTMLElement = document.getElementById('stop');
    const startButton: HTMLElement = document.getElementById('start');

    stopButton.addEventListener('click', ()=>{
        run = false;
    });
    startButton.addEventListener('click', ()=>{
        run = true;
    })
    const targetCanvas: HTMLCanvasElement = document.getElementById('target-canvas') as HTMLCanvasElement;
    drawImage(targetCanvas, './imgs/chrome.png');
    const targetCtx = targetCanvas.getContext('2d');
    const targetData = targetCtx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
    const evolutionCanvas: HTMLCanvasElement = document.getElementById('evolution-canvas') as HTMLCanvasElement;
    const evolution = new Evolution(evolutionCanvas, targetData);
    evolution.draw();
    loop(evolution);
}
function loop(evolution: Evolution) {
    if (run) {
        evolution.variant();
    }
    setTimeout(() => {
        loop(evolution)
    }, 1);
}

interface MaxVariantParams {
    rangeStart: number;
    rangeEnd: number;
    rate: number;
}

interface NormalVariantParams {
    rate: number;
    range: number;
}

function variant(value: number, maxVariant: MaxVariantParams, midVariant: NormalVariantParams, minVariant: NormalVariantParams): number {
    let variantValue = value; 
    const { rangeStart, rangeEnd } = maxVariant;
    if (utils.rand(maxVariant.rate)) {
        variantValue = utils.generateRandomInt(rangeStart, rangeEnd)
    }
    else if (utils.rand(midVariant.rate)) {
        variantValue = Math.min(rangeEnd, Math.max(rangeStart, value + generateRandomInt(-midVariant.range, midVariant.range)));
    }
    else if (utils.rand(minVariant.rate)) {
        variantValue = Math.min(rangeEnd, Math.max(rangeStart, value + generateRandomInt(-minVariant.range, minVariant.range)));
    }
    return variantValue;
}

init();
