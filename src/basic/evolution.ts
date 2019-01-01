import { Scallop } from './scallop';

export class Evolution {
    private status = STATUS.RUN;
    private targetImageData: ImageData;
    private trianglesCount: number;
    private targetCanvasContext: CanvasRenderingContext2D;
    private sourceCanvasContext: CanvasRenderingContext2D;
    private parent: Scallop;
    private child: Scallop;

    constructor() {
        this.initEvolution();
        this.loop();
    }

    private initEvolution() {
        this.trianglesCount = 80;
        this.initHtmlElements();

        this.getTargetDataByCanvas('./imgs/chrome.png', this.targetCanvasContext);

        this.parent = new Scallop(this.trianglesCount, this.sourceCanvasContext);
        this.child = new Scallop(this.trianglesCount, this.sourceCanvasContext, this.parent);
    }

    private loop() {
        if (this.targetImageData && this.status === STATUS.RUN) {
            if (this.clacMatchRateWith(this.parent) > this.clacMatchRateWith(this.child)) {
                this.parent = this.child;
            }
            this.child = new Scallop(this.trianglesCount, this.sourceCanvasContext, this.parent);
        }
        setTimeout(this.loop.bind(this), 1);
    }

    private initHtmlElements(): void {
        this.initEventListeners();

        const targetCanvas = document.getElementById('target') as HTMLCanvasElement;
        this.targetCanvasContext = targetCanvas.getContext('2d');
        const sourceCanvas = document.getElementById('result') as HTMLCanvasElement;
        this.sourceCanvasContext = sourceCanvas.getContext('2d');
    }

    private getTargetDataByCanvas(imageSrc: string , canvasContext: CanvasRenderingContext2D) {
        const image = new Image();
        canvasContext.clearRect(0, 0, 256, 256);
        image.onload = () => {
            canvasContext.drawImage(image, 0 , 0);
            this.targetImageData = canvasContext.getImageData(0, 0, 256, 256);
        };
        image.src = imageSrc;
    }

    private clacMatchRateWith(scallop: Scallop): number {
        return scallop.clacMatchRate(this.targetImageData);
    }

    private initEventListeners() {
        const startButton = document.getElementById('start');
        const pauseButton = document.getElementById('pause');
        const stopButton = document.getElementById('stop');
        startButton.addEventListener('click', this.handleStartButtonClick);
        pauseButton.addEventListener('click', this.handlePauseButtonClick);
        stopButton.addEventListener('click', this.handleStopButtonClick);
    }

    private handleStartButtonClick() {
        this.status = STATUS.RUN;
    }

    private handlePauseButtonClick() {
        this.status = STATUS.PAUSE;
    }

    private handleStopButtonClick() {
        this.status = STATUS.STOP;
    }
}

enum STATUS {
    RUN,
    STOP,
    PAUSE
}
