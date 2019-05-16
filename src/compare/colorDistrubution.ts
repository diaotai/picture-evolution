
function filterImageData(data) {
    let res = new Array(8 * 8 * 8 * 8).fill(0);
    let device = val => {
        let mapVal = 0;
        if (val > 223) {
            // [224 ~ 255]
            mapVal = 7;
        } else if (val > 191) {
            // [192 ~ 223]
            mapVal = 6;
        } else if (val > 159) {
            // [160 ~ 191]
            mapVal = 5;
        } else if (val > 127) {
            // [128 ~ 159]
            mapVal = 4;
        } else if (val > 95) {
            // [96 ~ 127]
            mapVal = 3;
        } else if (val > 63) {
            // [64 ~ 95]
            mapVal = 2;
        } else if (val > 31) {
            // [32 ~ 63]
            mapVal = 1;
        } else {
            // [0 ~ 31]
            mapVal = 0;
        }
        return mapVal;
    };
    for (let index = 0; index < data.length; index += 4) {
        let key =
            device(data[index]) * 8 * 8 * 8 +
            device(data[index + 1]) * 8 * 8 +
            device(data[index + 2]) * 8 +
            device(data[index + 3]);

        res[key] += 1;
    }
    return res;
}
// 余弦相似度
function vectorCosine(p1, p2): number {
    if (p1.length != p2.length) return 0;

    let fenzi = 0,
        sqrt1 = 0,
        sqrt2 = 0;
    for (let i = 0; i < p1.length; i++) {
        fenzi += p1[i] * p2[i];
        sqrt1 += p1[i] * p1[i];
        sqrt2 += Math.pow(p2[i], 2);
    }

    let res = fenzi / (Math.sqrt(sqrt1) * Math.sqrt(sqrt2));
    return res;
}

export function colorDistributionCompare(image1: ImageData, image2: ImageData): number {
    return vectorCosine(filterImageData(image1.data), filterImageData(image2.data));
};
