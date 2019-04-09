import { IButtonElements, IHTMLInputElements, IParams } from './interfaces/index';
import { Evolution } from './basic/evolution';

function main() {
    initResultCanvas();
    const evolution = new Evolution();
    initEventListeners(evolution);
    console.log(getAllHTMLInputValues());
}

function initEventListeners(evolution: Evolution) {
    const buttonElements = getAllButtonElements();

    buttonElements.startButton.addEventListener('click', evolution.handleStartButtonClick.bind(evolution));
    buttonElements.pauseButton.addEventListener('click', evolution.handlePauseButtonClick.bind(evolution));
    buttonElements.stopButton.addEventListener('click', evolution.handleStopButtonClick.bind(evolution));
    // buttonElements.setParamsButton.addEventListener('click', evolution.handleSetParamsButtonClick.bind(evolution, ));
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

function getAllHTMLInputValues(): IParams  {
    const params: any = {
        colorFactors: {
            max: {},
            mid: {},
            min: {}
        },
        pointFactors: {
            max: {},
            mid: {},
            min: {}
        }
    };
    const inputElements = getAllHTMLInputElements();
    params.colorAlpha = getValueFromInputElement(inputElements.colorAlphaInput);
    params.trianglesCount = getValueFromInputElement(inputElements.triangeCountInput);

    params.colorFactors.max.rate = getValueFromInputElement(inputElements.colorsElements.max.rateInput);
    params.colorFactors.max.start = getValueFromInputElement(inputElements.colorsElements.max.rangeStartInput);
    params.colorFactors.max.end = getValueFromInputElement(inputElements.colorsElements.max.rangeEndInput);
    params.colorFactors.mid.rate = getValueFromInputElement(inputElements.colorsElements.mid.rateInput);
    params.colorFactors.mid.range = getValueFromInputElement(inputElements.colorsElements.mid.rangeInput);
    params.colorFactors.min.rate = getValueFromInputElement(inputElements.colorsElements.min.rateInput);
    params.colorFactors.min.range = getValueFromInputElement(inputElements.colorsElements.min.rangeInput);

    params.pointFactors.max.rate = getValueFromInputElement(inputElements.pointsElements.max.rateInput);
    params.pointFactors.max.start = getValueFromInputElement(inputElements.pointsElements.max.rangeStartInput);
    params.pointFactors.max.end = getValueFromInputElement(inputElements.pointsElements.max.rangeEndInput);
    params.pointFactors.mid.rate = getValueFromInputElement(inputElements.pointsElements.mid.rateInput);
    params.pointFactors.mid.range = getValueFromInputElement(inputElements.pointsElements.mid.rangeInput);
    params.pointFactors.min.rate = getValueFromInputElement(inputElements.pointsElements.min.rateInput);
    params.pointFactors.min.range = getValueFromInputElement(inputElements.pointsElements.min.rangeInput);

    return params;
}

function getValueFromInputElement(inputElement: HTMLInputElement): number {
    return parseFloat(inputElement.value);
}

function getAllButtonElements(): IButtonElements {
    const elements: any = {};
    elements.startButton = document.getElementById('start');
    elements.pauseButton = document.getElementById('pause');
    elements.stopButton = document.getElementById('stop');
    elements.setParamsButton = document.getElementById('setParams');
    return elements;
}

function getAllHTMLInputElements(): IHTMLInputElements {
    const elements: any = {
        colorsElements: {
            max: {},
            min: {},
            mid: {}
        },
        pointsElements: {
            max: {},
            min: {},
            mid: {}
        }
    };
    elements.triangeCountInput = getHtmlInputElementById('triangleCount');

    elements.colorAlphaInput = getHtmlInputElementById('colorAlpha');

    elements.colorsElements.max.rateInput = getHtmlInputElementById('colorMaxMutateRate');
    elements.colorsElements.max.rangeStartInput = getHtmlInputElementById('colorMaxMutateRangeStart');
    elements.colorsElements.max.rangeEndInput = getHtmlInputElementById('colorMaxMutateRangeEnd');
    elements.colorsElements.mid.rateInput = getHtmlInputElementById('colorMidMutateRate');
    elements.colorsElements.mid.rangeInput = getHtmlInputElementById('colorMidMutateRange');
    elements.colorsElements.min.rateInput = getHtmlInputElementById('colorMinMutateRate');
    elements.colorsElements.min.rangeInput = getHtmlInputElementById('colorMinMutateRange');

    elements.pointsElements.max.rateInput = getHtmlInputElementById('pointMaxMutateRate');
    elements.pointsElements.max.rangeStartInput = getHtmlInputElementById('pointMaxMutateRangeStart');
    elements.pointsElements.max.rangeEndInput = getHtmlInputElementById('pointMaxMutateRangeEnd');
    elements.pointsElements.mid.rateInput = getHtmlInputElementById('pointMidMutateRate');
    elements.pointsElements.mid.rangeInput = getHtmlInputElementById('pointMidMutateRange');
    elements.pointsElements.min.rateInput = getHtmlInputElementById('pointMinMutateRate');
    elements.pointsElements.min.rangeInput = getHtmlInputElementById('pointMinMutateRange');

    return elements;
}

function getHtmlInputElementById(id: string): HTMLInputElement {
    return document.getElementById(id) as HTMLInputElement;
}

window.onload = main;
