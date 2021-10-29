import { ValidationService } from './validation/validation.service';
import FileProcessorResult from './enums/FileProcessorResult.enum';
import ValidationResult from './enums/ValidationResult.enum';
import processImage from "./libs/imageProcessor";
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { S3Service } from './s3/s3.service';
import isImage from './libs/isImage';

@Injectable()
export class AppService {
    constructor(private configService: ConfigService, private validationService: ValidationService, private s3Service: S3Service) {}

    getHello(): string {
        return "Hello World!";
    }

    getDynamicMessage(filename: string): string {
        return `Successfully uploaded "${filename}"`;
    }

    async processFile(filename: string, file: Express.Multer.File, preferredSize?: string): Promise<FileProcessorResult> {
        switch(this.validationService.validateFile(file)) {
            case ValidationResult.TOO_BIG:
                return FileProcessorResult.PAYLOAD_TOO_LARGE;
            case ValidationResult.NOT_ALLOWED:
                return FileProcessorResult.UNSUPPORTED_MEDIA_TYPE;
        }

        const buffer = (
            isImage(file.mimetype)
                ? await processImage(this.configService.get<any>("image.sizes"), file.buffer, preferredSize)
                : file.buffer
        );

        await this.s3Service.upload(filename, buffer);
        return FileProcessorResult.OK;
    }
}
