import { CreateBucketCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import S3UploadResult from "../enums/S3UploadResult.enum";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class S3Service {
    private s3Client: S3Client;

    constructor(private configService: ConfigService) {}

    getClient(): S3Client {
        if(!this.s3Client) {
            this.s3Client = new S3Client({
                region: this.configService.get<string>("s3.connection.region"),
                endpoint: this.configService.get<string>("s3.connection.endpoint"),
                credentials: {
                    accessKeyId: this.configService.get<string>("s3.auth.accessKeyId"),
                    secretAccessKey: this.configService.get<string>("s3.auth.secretAccessKey")
                }
            });
        }

        return this.s3Client;
    }

    async upload(filename: string, buffer: Buffer): Promise<S3UploadResult> {
        const uploadParams = {
            Bucket: this.configService.get<string>("s3.loader.bucketName"),
            Key: filename,
            Body: buffer
        };
    
        try {
            const data = await this.getClient().send(new CreateBucketCommand(uploadParams));
            // console.log(data);
            // console.log(`Successfully created a bucket called ${data.Location}`);
        } catch(e) {
            console.error(e);
            return S3UploadResult.BUCKET_CREATION_ERROR;
        }
    
        try {
            const results = await this.getClient().send(new PutObjectCommand(uploadParams));
            // console.log(results);
            console.log(`Successfully uploaded file to ${uploadParams.Bucket}/${uploadParams.Key}`);
        } catch(e) {
            console.error(e);
            return S3UploadResult.LOADING_ERROR;
        }

        return S3UploadResult.OK;
    }
}