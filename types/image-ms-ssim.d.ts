declare module ImageMSSSIM {
    type Data = number[] | any[] | Uint8Array;
    /**
     * Grey = 1, GreyAlpha = 2, RGB = 3, RGBAlpha = 4
     */
    type Channels = number;
    interface IImage {
        data: Data;
        width: number;
        height: number;
        channels: Channels;
    }
    interface IResult {
        msssim: number;
        ssim: number;
    }
    /**
     * Entry point.
     */
    function compare(image1: IImage, image2: IImage, windowSize?: number, K1?: number, K2?: number, luminance?: boolean, bitsPerComponent?: number): IResult;
}
export = ImageMSSSIM;
