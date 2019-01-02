import { Evolution } from './basic/evolution';

function main() {
    const evolution = new Evolution();
    initEventListeners(evolution);
}

function initEventListeners(evolution: Evolution) {
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const stopButton = document.getElementById('stop');

    startButton.addEventListener('click', evolution.handleStartButtonClick.bind(evolution));
    pauseButton.addEventListener('click', evolution.handlePauseButtonClick.bind(evolution));
    stopButton.addEventListener('click', evolution.handleStopButtonClick.bind(evolution));
}

window.onload = main;
