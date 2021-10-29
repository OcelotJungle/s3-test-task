import { registerAs } from "@nestjs/config";

export default registerAs("s3", () => ({
    connection: {
        region: process.env.S3_CONNECTION_REGION.trim(),
        endpoint: process.env.S3_CONNECTION_ENDPOINT.trim()
    },
    auth: {
        accessKeyId: process.env.S3_AUTH_ACCESS_KEY_ID.trim(),
        secretAccessKey: process.env.S3_AUTH_SECRET_ACCESS_KEY.trim()
    },
    loader: {
        bucketName: process.env.S3_LOADER_BUCKET_NAME.trim()
    }
}));