import { Evolution } from './basic/evolution';

function main() {
    initResultCanvas();
    new Evolution();
}

function initResultCanvas(nums = 100) {
    const resultDiv = document.getElementById('result');
    for (let i = 0; i < nums; i++) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        canvas.innerText = 'Something wrong happened!clear';
        resultDiv.appendChild(canvas);
    }
}


window.onload = main;
