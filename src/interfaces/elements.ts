export interface IButtonElements {
    startButton: HTMLElement;
    pauseButton: HTMLElement;
    stopButton: HTMLElement;
    setParamsButton: HTMLElement;
}

export interface IHTMLInputElements {
    triangeCountInput: HTMLInputElement;
    colorAlphaInput: HTMLInputElement;
    pointsElements: IMuterElements;
    colorsElements: IMuterElements;
}

export interface IMuterElements {
    max: IRangeMuterElements;
    mid: ISelfMuterElements;
    min: ISelfMuterElements;
}

interface IRangeMuterElements {
    rateInput: HTMLInputElement;
    rangeStartInput: HTMLInputElement;
    rangeEndInput: HTMLInputElement;
}

interface ISelfMuterElements {
    rateInput: HTMLInputElement;
    rangeInput: HTMLInputElement;
}
