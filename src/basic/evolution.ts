import { Scallop } from './scallop';

enum STATUS {
    INIT,
    RUN,
    PAUSE
}

interface Params {
    trianglesCount: number;
    colorAlpha: number;
}

export class Evolution {
    private status = STATUS.RUN;
    private targetImageData: ImageData;
    private trianglesCount = 80;
    private colorAlpha = 0.35;
    private targetCanvasContext: CanvasRenderingContext2D;
    private sourceCanvasContext: CanvasRenderingContext2D;
    private parent: Scallop;
    private child: Scallop;

    constructor() {
        this.initEvolution();
        this.loop();
    }

    public handleStartButtonClick() {
        if (this.status === STATUS.INIT) {
            this.initEvolution();
        }
        this.status = STATUS.RUN;
    }

    public handlePauseButtonClick() {
        this.status = STATUS.PAUSE;
    }

    public handleStopButtonClick() {
        this.status = STATUS.INIT;
        this.sourceCanvasContext.clearRect(0, 0, 256, 256);
    }

    public handleTriangleCountChange(e: Event) {
        if (this.status !== STATUS.INIT) {
            e.preventDefault();
            alert('You can not change triangles count when program is running');
            return;
        }
        this.trianglesCount = parseInt((e.target as HTMLInputElement).value, 10);
    }

    private initEvolution() {
        this.initHtmlElements();

        this.getTargetDataByCanvas('./imgs/chrome.png', this.targetCanvasContext);

        this.parent = new Scallop(this.trianglesCount, this.sourceCanvasContext);
        this.child = new Scallop(this.trianglesCount, this.sourceCanvasContext, this.parent);
    }

    private loop() {
        console.log(this.trianglesCount, '!!!!');
        if (this.targetImageData && this.status === STATUS.RUN) {
            if (this.clacMatchRateWith(this.parent) > this.clacMatchRateWith(this.child)) {
                this.parent = this.child;
            }
            this.child = new Scallop(this.trianglesCount, this.sourceCanvasContext, this.parent);
        }
        setTimeout(this.loop.bind(this), 1);
    }

    private initHtmlElements(): void {
        const targetCanvas = document.getElementById('target') as HTMLCanvasElement;
        this.targetCanvasContext = targetCanvas.getContext('2d');

        const sourceCanvas = document.getElementById('result') as HTMLCanvasElement;
        this.sourceCanvasContext = sourceCanvas.getContext('2d');
        this.sourceCanvasContext.globalAlpha = this.colorAlpha;

        this.sourceCanvasContext.clearRect(0, 0, 256, 256);
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

}
