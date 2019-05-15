import { Scallop } from './scallop';

interface Params {
    trianglesCount: number;
    colorAlpha: number;
}

export class Evolution {
    private targetImageData: ImageData;
    private trianglesCount = 80;
    private colorAlpha = 0.35;
    private targetCanvas: HTMLCanvasElement;
    private targetCanvasContext: CanvasRenderingContext2D;
    private sourceCanvasContext: CanvasRenderingContext2D[] = [];
    private scallops: Scallop[] = [];
    private scallopCount = 100; 
    private outRate = 0.2;
    private startDate: number;        // 进化开始的时间
    private loopCount = 0;          // 进化进行的代数
    private lastBestMatchRate = Number.MIN_SAFE_INTEGER;   // 之前最好的rate
    private lastBestLoopCount = 0;          // 之前最好的那一次的代数

    constructor() {
        this.initEvolution().then(() => {
            this.loop();
            this.startDate = Date.now();
        });
    }

    private async initEvolution() {
        this.initHtmlElements();

        await this.getTargetDataByCanvas('./imgs/chrome.png', this.targetCanvasContext);
        for (let i = 0; i < this.sourceCanvasContext.length; i++) {
            const scallop = new Scallop(this.trianglesCount, this.sourceCanvasContext[i], this.targetImageData);
            this.scallops.push(scallop);
        }
    }

    private loop() {
        const scallops = this.scallops;
        for (let scallop of scallops) {
            scallop.draw();
        }

        this.doNaturalSelection();
        if (scallops[0].matchRate > this.lastBestMatchRate) {
            this.lastBestMatchRate = scallops[0].matchRate;
            this.lastBestLoopCount = this.loopCount;
        } else if (this.loopCount - this.lastBestLoopCount > 100){
            console.log('done', (Date.now() - this.startDate) / 1000);
            return;
        }
        this.loopCount++;
        setTimeout(this.loop.bind(this), 0);
    }
    
    private doNaturalSelection() {
        const count = this.scallopCount;
        let scallops = this.scallops;

        // 计算与目标图片的相似度
        scallops = scallops.sort((x, y) => {
            return this.clacMatchRateWith(y) - this.clacMatchRateWith(x);
        })

        console.log(this.loopCount, '!!!!!!!', this.clacMatchRateWith(scallops[0]), '!!!!!', this.lastBestMatchRate, this.lastBestLoopCount);

        const startBoundary = Math.floor(count * this.outRate);
        const endBoundary = Math.floor(count * (1 - this.outRate));
        const visited = new Set();

        for (let i = startBoundary; i < endBoundary; i++) {
            visited.add(i);
        }

        // 进行交配
        while (visited.size) {
            const parent0Index = this.getRandomKeyFromSet(visited);
            const parent1Index = this.getRandomKeyFromSet(visited);
            scallops[parent0Index].mate(scallops[parent1Index]);
        }

        for (let i = endBoundary; i < scallops.length; i++) {
            const index = Math.floor(Math.random() * endBoundary);
            const originScallop = scallops[i];
            scallops[i] = new Scallop(originScallop.triangleCount, originScallop.canvasContext, this.targetImageData, scallops[index])
        }
    }
x
    private initHtmlElements(): void {
        const targetCanvas = document.getElementById('target') as HTMLCanvasElement;
        this.targetCanvas = targetCanvas;
        this.targetCanvasContext = targetCanvas.getContext('2d');
        const resultDiv = document.getElementById('result');
        const sourceCanvas = resultDiv.getElementsByTagName('canvas');
        for (let canva of sourceCanvas) {
            const context = canva.getContext('2d');
            context.globalAlpha = this.colorAlpha;
            this.sourceCanvasContext.push(context);
            context.clearRect(0, 0, this.targetCanvas.width, this.targetCanvas.height);
        }
    }

    private getTargetDataByCanvas(imageSrc: string , canvasContext: CanvasRenderingContext2D) {
        const image = new Image();
        const width = this.targetCanvas.width;
        const height = this.targetCanvas.height;
        canvasContext.clearRect(0, 0, width, height);
        image.src = imageSrc;
        return new Promise((resolve) => {
            image.onload = () => {
                canvasContext.drawImage(image, 0 , 0, width, height);
                this.targetImageData = canvasContext.getImageData(0, 0, 256, 256);
                resolve();
            };
        })
      
    }

    private clacMatchRateWith(scallop: Scallop): number {
        return scallop.matchRate;
    }

    private getRandomKeyFromSet(set: Set<number>): number {
        const size = set.size;
        if (size === 0) {
            return 0;
        }
        const keys = [...set.keys()];
        const key = keys[Math.floor(Math.random() * size)];
        set.delete(key);
        return key;
    }

}
