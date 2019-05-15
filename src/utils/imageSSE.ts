export function compare(image1: ImageData, image2: ImageData) {
    var sum = 0;
    var l = image1.data.length;
    var i;
    var a1;
    var a2;
    for (i = 0; i < l; i += 4) {
        a1 = image1.data[i + 3] / 255;
        a2 = image2.data[i + 3] / 255;
        sum += Math.pow(
            0.212655 * image1.data[i] * a1 -
                0.212655 * image2.data[i] * a2,
            2
        );
        sum += Math.pow(
            0.715158 * image1.data[i + 1] * a1 -
                0.715158 * image2.data[i + 1] * a2,
            2
        );
        sum += Math.pow(
            0.072187 * image1.data[i + 2] * a1 -
                0.072187 * image2.data[i + 2] * a2,
            2
        );
    }
    var pc = l;
    var mse = sum / pc;
    return {
        mse: mse,
        psnr: psnr(mse)
    };
}
function psnr(mse, max = 255): number {
    return 10 * log10((max * max) / mse);
}
function log10(value: number): number {
    return Math.log(value) / Math.LN10;
}