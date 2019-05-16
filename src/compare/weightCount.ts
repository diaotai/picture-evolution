export function weightCountCompare(image1: ImageData, image2: ImageData): number {
    let matchRate = 0;
    for (let i = 0; i < image1.data.length; i++) {
        if (i + 1 % 4 === 0) {
            continue;
        }
        const rate = (256 - Math.abs(image1.data[i] - image2.data[i])) / 256 || 0;
        matchRate += rate;
    }
    return matchRate;
}