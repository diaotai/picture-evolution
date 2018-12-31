import { Scallop } from './basic/index';

let state = "init";
let targetData;
const yo = document.getElementById("result") as HTMLCanvasElement;
const ctx = yo.getContext("2d");
const total: any = {};

const triangleCount = 80;

function start() {
    if (state === "init") {
        state = "looping";
        const parent = new Scallop(triangleCount, ctx);
        const child = new Scallop(triangleCount, ctx, parent);
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
    const image = new Image();
    image.src = "./imgs/chrome.png";
    image.onload = () => {
        targetCtx.drawImage(image, 0, 0);
        targetData = targetCtx.getImageData(0, 0, 256, 256);
    };
};
function looping(parent: Scallop, child: Scallop, targetData, ctx) {
    if (state === "looping") {
        if (parent.clacMatchRate(targetData) > child.clacMatchRate(targetData)) {
            parent = child;
        }
        child = new Scallop(triangleCount, ctx, parent);
        setTimeout(looping, 1, parent, child, targetData, ctx);
    } else if (state === "pause") {
        total.parent = parent;
        total.child = child;
    }
}
