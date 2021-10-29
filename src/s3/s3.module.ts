import { ConfigModule } from '@nestjs/config';
import s3Config from 'src/configs/s3.config';
import { S3Service } from './s3.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: ".env.local",
        load: [s3Config]
    })],
    providers: [S3Service],
    controllers: [],
    exports: [S3Service]
})
export class S3Module {}
