export function pixelAverageCompare(image1: ImageData, image2: ImageData): number {
    let rate = 0;
    for (let i = 0; i < image1.data.length; i++) {
        const data0 = (0.299 * image1.data[i] + 0.587 * image1.data[i+1] + 0.114 * image1.data[i+2]) || 0;
        const data1 = (0.299 * image2.data[i] + 0.587 * image2.data[i+1] + 0.114 * image2.data[i+2]) || 0;
        rate += Math.pow(data0 - data1, 2);
    }
    return -rate;
}
