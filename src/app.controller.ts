import { Controller, Get, Post, Param, Render, UseInterceptors, UploadedFile, HttpException, HttpStatus, Query } from '@nestjs/common';
import FileProcessorResult from './enums/FileProcessorResult.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Render("index")
    index(): void {}

    @Post(":filename")
    @UseInterceptors(FileInterceptor("file"))
    async load(
        @Param("filename") filename: string,
        @Query("preferredSize") preferredSize: string,
        @UploadedFile() file: Express.Multer.File): Promise<string> {
        switch(await this.appService.processFile(filename, file, preferredSize)) {
            case FileProcessorResult.OK:
                throw new HttpException("OK", HttpStatus.OK);
            case FileProcessorResult.PAYLOAD_TOO_LARGE:
                throw new HttpException("Payload Too Large", HttpStatus.PAYLOAD_TOO_LARGE);
            case FileProcessorResult.UNSUPPORTED_MEDIA_TYPE:
                throw new HttpException("Unsupported Media Type", HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }
    }
}
