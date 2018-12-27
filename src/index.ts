import * as utils from './utils/index';

let state = "init";
let targetImageData;
let targetData;
let yo = document.getElementById("result") as HTMLCanvasElement;
let ctx = yo.getContext("2d");
let total: any = {};

const triangleCount = 80;

function start(){
    if(state == "init"){
        state = "looping";
        const parent = new Drawing(triangleCount, ctx);
        const child = new Drawing(triangleCount, ctx, parent);
        setTimeout(function(){looping(parent, child, targetData, ctx)}, 1);
    }
    else if(state == "pause"){
        state = "looping";
        setTimeout(function(){looping(total.parent, total.child, targetData, ctx)}, 1);
    }
}

function stop(){
    state = "init";
}

function pause(){
    state = "pause";
}

window.onload = function(){

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
}

// [s, e)
function randRange(s, e){
    let range = e - s;
    return s + Math.floor(Math.random() * range);
}
// [0,num)
function randWithNum(num){
    return randRange(0, num);
}

function Color(r = randWithNum(255), g = randWithNum(255), b = randWithNum(255)){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = 0.4;
}

Color.prototype.mutate = function(){
    let totalMutated = 0;
    const maxVariant = {
        rangeStart: 0,
        rangeEnd: 255,
        rate: 0.0008
    }
    const midVariant = {
        range: 10,
        rate: 0.003
    }
    const minVariant = {
        range: 5,
        rate: 0.009
    }
    this.r = variant(this.r, maxVariant, midVariant, minVariant);
    this.g = variant(this.g, maxVariant, midVariant, minVariant);
    this.b = variant(this.b, maxVariant, midVariant, minVariant);
    return totalMutated;

}

function Point(x?: number, y?: number){
    this.x = x || utils.generateRandomInt(0, 255);
    this.y = y || utils.generateRandomInt(0, 255);
}

Point.max_mutate_rate = 0.0008;
Point.mid_mutate_rate = 0.003;
Point.min_mutate_rate = 0.009;

Point.prototype.mutate = function(){
    let totalMutated = 0;
    const maxVariant = {
        rangeStart: 0,
        rangeEnd: 255,
        rate: 0.0008
    }
    const midVariant = {
        range: 10,
        rate: 0.003
    }
    const minVariant = {
        range: 5,
        rate: 0.009
    }
    this.x = variant(this.x, maxVariant, midVariant, minVariant);
    this.y = variant(this.y, maxVariant, midVariant, minVariant);
 
    return totalMutated;
}

function Triangle(ps?: any, color?: any){
    this.points = new Array(3);
    for(let i = 0; i < 3; i++){
        if(ps){
            this.points[i] = new Point(ps[i].x, ps[i].y);
        }
        else{
            this.points[i] = new Point();
        }
    }
    (color)? (this.color = new Color(color.r, color.g, color.b)) : (this.color = new Color());
}

Triangle.prototype.mutate = function(){
    let totalMutated = 0;
    for(let i = 0; i < 3; i++){
        totalMutated += this.points[i].mutate();
    }
    totalMutated += this.color.mutate();
    return totalMutated;
}

Triangle.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.fillStyle = 'rgb('+ this.color.r + ',' + this.color.g + ',' + this.color.b + ')';
    ctx.moveTo(this.points[0].x, this.points[0].y);
    ctx.lineTo(this.points[1].x, this.points[1].y);
    ctx.lineTo(this.points[2].x, this.points[2].y);
    ctx.closePath();
    ctx.fill();
}

function Drawing(triangleNum, ctx, parent?: any){
    this.triangles = new Array(triangleNum);
    this.triangleNum = triangleNum;
    this.matchRate = 0;
    this.ctx = ctx;
    if(!parent){
        this.initAsParent();
    }
    else{
        this.cloneAndMutateFromParent(parent);
    }
}

Drawing.prototype.initAsParent = function(){
    for(let i = 0; i < this.triangleNum; i ++){
        this.triangles[i] = new Triangle();
    }
}

Drawing.prototype.cloneAndMutateFromParent = function(parent){
    for(let i = 0; i < this.triangleNum; i++){
        this.triangles[i] = new Triangle(parent.triangles[i].points, parent.triangles[i].color);
        this.triangles[i].mutate();
    }
    this.dirty();
}

Drawing.prototype.dirty = function(){
    let dirtyOne = randWithNum(this.triangleNum);
    let dirtyP = randWithNum(4);
    if(dirtyP < 3){
        this.triangles[dirtyOne].points[dirtyP].x = Math.min(Math.max(0, this.triangles[dirtyOne].points[dirtyP].x + randRange(-5, 5)), 255);
        this.triangles[dirtyOne].points[dirtyP].y = Math.min(Math.max(0, this.triangles[dirtyOne].points[dirtyP].y + randRange(-5, 5)), 255);
    }
    else{
        this.triangles[dirtyOne].color.r = Math.min(Math.max(0, this.triangles[dirtyOne].color.r + randRange(-8, 8)), 255);
        this.triangles[dirtyOne].color.g = Math.min(Math.max(0, this.triangles[dirtyOne].color.g + randRange(-8, 8)), 255);
        this.triangles[dirtyOne].color.b = Math.min(Math.max(0, this.triangles[dirtyOne].color.b + randRange(-8, 8)), 255);
    }
}

Drawing.prototype.draw = function(){
    this.ctx.clearRect(0, 0, 256, 256);
    this.ctx.globalAlpha = 0.35;
    for(let i = 0; i < this.triangles.length; i++){
        this.triangles[i].draw(this.ctx);
    }
}

Drawing.prototype.calcRate = function(targetData){
    if(this.matchRate > 0){
        console.log(this.matchRate);
        return this.matchRate;
    }
    this.draw();
    this.matchRate = 0;
    let resultMatchRate = this.ctx.getImageData(0, 0, 256, 256);
    for(let i = 0; i < resultMatchRate.data.length; i++){
        // alpha is out of our concern
        // matchRate += Delta r * Delta r + Delta g * Delta g + Delta b * Delta b
        if(i%3==0){
            continue;
        }
        this.matchRate += (targetData[i] - resultMatchRate.data[i]) * (targetData[i] - resultMatchRate.data[i]);
    }
    return this.matchRate;
}

Drawing.prototype.drawIt = function(ctx){
    ctx.clearRect(0, 0, 256, 256);
    ctx.globalAlpha = 0.35;
    for(let i = 0; i < this.triangles.length; i++){
        this.triangles[i].draw(ctx);
    }
}

function looping(parent, child, targetData, ctx){
    if(state == "looping"){
        if(parent.calcRate(targetData) > child.calcRate(targetData)){
            parent = child;
        }
        child = new Drawing(triangleCount, ctx, parent);
        let delay = 1;
        if(delay > 0){
            setTimeout(looping, delay, parent, child, targetData, ctx);
        }
        else{
            setTimeout(looping, 0, parent, child, targetData, ctx);
        }
    }
    else if(state == "pause"){
        total.parent = parent;
        total.child = child;
    }
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
        variantValue = Math.min(rangeEnd, Math.max(rangeStart, value + utils.generateRandomInt(-midVariant.range, midVariant.range)));
    }
    else if (utils.rand(minVariant.rate)) {
        variantValue = Math.min(rangeEnd, Math.max(rangeStart, value + utils.generateRandomInt(-minVariant.range, minVariant.range)));
    }
    return variantValue;
}