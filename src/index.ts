import { Triangle } from './basic/index';
import * as utils from './utils/index';

let state = "init";
let targetImageData;
let targetData;
const yo = document.getElementById("result") as HTMLCanvasElement;
const ctx = yo.getContext("2d");
const total: any = {};

const triangleCount = 80;

function start() {
    if (state === "init") {
        state = "looping";
        const parent = new Drawing(triangleCount, ctx);
        const child = new Drawing(triangleCount, ctx, parent);
        setTimeout(() => {looping(parent, child, targetData, ctx); }, 1);
    } else if (state === "pause") {
        state = "looping";
        setTimeout(() => {looping(total.parent, total.child, targetData, ctx); }, 1);
    }
}

function stop() {
    state = "init";
}

function pause() {
    state = "pause";
}

window.onload = () => {

    const targetCanvas = document.getElementById("target") as HTMLCanvasElement;
    const targetCtx = targetCanvas.getContext("2d");
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const pauseButton = document.getElementById('pause');
    startButton.addEventListener('click', start);
    stopButton.addEventListener('click', stop);
    pauseButton.addEventListener('click', pause);
    targetCtx.clearRect(0, 0, 256, 256);
    let image = new Image();
    image.src = "./imgs/chrome.png";
    image.onload = function(){
        targetCtx.drawImage(image, 0, 0);
        targetImageData = targetCtx.getImageData(0, 0, 256, 256);
        targetData = targetImageData.data;
    }
};

function Drawing(triangleNum, ctx, parent?: any) {
    this.triangles = new Array(triangleNum);
    this.triangleNum = triangleNum;
    this.matchRate = 0;
    this.ctx = ctx;
    if (!parent) {
        this.initAsParent();
    } else {
        this.cloneAndMutateFromParent(parent);
    }
}

Drawing.prototype.initAsParent = function() {
    for (let i = 0; i < this.triangleNum; i ++) {
        this.triangles[i] = new Triangle();
    }
};

Drawing.prototype.cloneAndMutateFromParent = function(parent) {
    for (let i = 0; i < this.triangleNum; i++) {
        this.triangles[i] = new Triangle(parent.triangles[i].points, parent.triangles[i].color);
        this.triangles[i].variant();
    }
    this.dirty();
};

Drawing.prototype.dirty = function() {
    const dirtyOne = utils.generateRandomIntBetweenZeroAndN(this.triangleNum);
    const dirtyP = utils.generateRandomIntBetweenZeroAndN(4);
    if (dirtyP < 3) {
        this.triangles[dirtyOne].points[dirtyP].x = Math.min(Math.max(0, this.triangles[dirtyOne].points[dirtyP].x + utils.generateRandomInt(-5, 5)), 255);
        this.triangles[dirtyOne].points[dirtyP].y = Math.min(Math.max(0, this.triangles[dirtyOne].points[dirtyP].y + utils.generateRandomInt(-5, 5)), 255);
    } else {
        this.triangles[dirtyOne].color.r = Math.min(Math.max(0, this.triangles[dirtyOne].color.r + utils.generateRandomInt(-8, 8)), 255);
        this.triangles[dirtyOne].color.g = Math.min(Math.max(0, this.triangles[dirtyOne].color.g + utils.generateRandomInt(-8, 8)), 255);
        this.triangles[dirtyOne].color.b = Math.min(Math.max(0, this.triangles[dirtyOne].color.b + utils.generateRandomInt(-8, 8)), 255);
    }
};

Drawing.prototype.draw = function() {
    this.ctx.clearRect(0, 0, 256, 256);
    this.ctx.globalAlpha = 0.35;
    for (const triangle of this.triangles) {
        triangle.draw(this.ctx);
    }
};

Drawing.prototype.calcRate = function(targetData: any) {
    if (this.matchRate > 0) {
        console.log(this.matchRate);
        return this.matchRate;
    }
    this.draw();
    this.matchRate = 0;
    const resultMatchRate = this.ctx.getImageData(0, 0, 256, 256);
    for (let i = 0; i < resultMatchRate.data.length; i++) {
        // alpha is out of our concern
        // matchRate += Delta r * Delta r + Delta g * Delta g + Delta b * Delta b
        if (i % 3 === 0) {
            continue;
        }
        this.matchRate += (targetData[i] - resultMatchRate.data[i]) * (targetData[i] - resultMatchRate.data[i]);
    }
    return this.matchRate;
};

Drawing.prototype.drawIt = function(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, 256, 256);
    ctx.globalAlpha = 0.35;
    for (const triangle of this.triangles) {
        triangle.draw(ctx);
    }
};

function looping(parent, child, targetData, ctx) {
    if (state === "looping") {
        if (parent.calcRate(targetData) > child.calcRate(targetData)) {
            parent = child;
        }
        child = new Drawing(triangleCount, ctx, parent);
        setTimeout(looping, 1, parent, child, targetData, ctx);
    } else if (state === "pause") {
        total.parent = parent;
        total.child = child;
    }
}
