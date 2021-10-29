import ValidationResult from 'src/enums/ValidationResult.enum';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
    constructor(private configService: ConfigService) {}

    validateFile(file: Express.Multer.File): ValidationResult {
        if(!this.validateFileSize(file.size)) return ValidationResult.TOO_BIG;
        if(!this.validateFileMimeType(file.mimetype)) return ValidationResult.NOT_ALLOWED;
        return ValidationResult.OK;
    }

    validateFileSize(size: number, maxSize: number = this.configService.get<number>("file.maxSize")): boolean {
        // console.log({ size, maxSize });

        return maxSize === 0 || size <= maxSize;
    }

    validateFileMimeType(mimetype: string, allowedMimeTypes: string = this.configService.get<string>("file.allowedMimeTypes")): boolean {
        // console.log({ mimetype, allowedMimeTypes });
    
        if(allowedMimeTypes.length === 0) return true;
    
        const allowed = allowedMimeTypes.includes(mimetype) || allowedMimeTypes.includes(`${mimetype.split("/")[0]}/*`);
        const restricted = allowedMimeTypes.includes(`-${mimetype}`);
    
        return allowed && !restricted;
    }
}
