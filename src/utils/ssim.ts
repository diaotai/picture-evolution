import { compare } from 'image-ms-ssim';

export function msCompare(image1: ImageData, image2: ImageData) {
	return compare(transfer(image1), transfer(image2)).ssim;
}

function transfer(image: ImageData) {
	const data = new Uint8Array(image.data.buffer);
	return {
		channels: 4,
		width: image.width,
		height: image.height,
		data
	}
}