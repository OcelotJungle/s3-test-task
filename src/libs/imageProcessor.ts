import sharp, { Sharp, Metadata } from "sharp";

function openImage(buffer: Buffer): Sharp {
    return sharp(buffer);
}

function defineSize(sizes: any, { width, height }: Metadata, preferredSize?: string): number {
    const currentSize: number = Math.min(width, height);

    if(
        preferredSize &&
        preferredSize.length > 0 &&
        preferredSize in sizes &&
        currentSize >= sizes[preferredSize]
    ) return sizes[preferredSize];

    if(currentSize >= sizes.large) return sizes.large;
    if(currentSize >= sizes.medium) return sizes.medium;
    return sizes.thumb;
}

function resizeImage(image: Sharp, size: number): Sharp {
    // console.log(`Used size ${size}`);

    return image.resize(size, size);
}

async function getImageBuffer(image: Sharp): Promise<Buffer> {
    return await image.toBuffer();
}

async function processImage(sizes: any, buffer: Buffer, preferredSize?: string): Promise<Buffer> {
    // console.log({ sizes });

    sharp.cache(false);
    
    const image: Sharp = openImage(buffer);
    const processedBuffer: Buffer = await getImageBuffer(resizeImage(image, defineSize(sizes, await image.metadata(), preferredSize)));

    return processedBuffer;
}

export default processImage;