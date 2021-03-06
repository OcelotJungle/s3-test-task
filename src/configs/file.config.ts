import { registerAs } from "@nestjs/config";

export default registerAs("file", () => ({
    maxSize: parseInt(process.env.FILE_MAX_SIZE_IN_MB) * 1024 * 1024,
    allowedExtensions: process.env.FILE_ALLOWED_EXTENSIONS.trim().replace(/\s+?/g, " "),
    allowedMimeTypes: process.env.FILE_ALLOWED_MIME_TYPES.trim().replace(/\s+?/g, " ")
}));