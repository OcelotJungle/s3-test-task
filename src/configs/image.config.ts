import { registerAs } from "@nestjs/config";

export default registerAs("image", () => ({
    sizes: {
        large: parseInt(process.env.IMAGE_SIZE_LARGE),
        medium: parseInt(process.env.IMAGE_SIZE_MEDIUM),
        thumb: parseInt(process.env.IMAGE_SIZE_THUMB)
    }
}));