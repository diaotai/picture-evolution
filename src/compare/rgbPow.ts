export function rgbPowCompare(image1: ImageData, image2: ImageData) {
    let matchRate = 0;
    for (let i = 0; i < image1.data.length; i++) {
        matchRate += Math.pow(image1.data[i] - image2.data[i], 2);
    }
    return -matchRate;
}