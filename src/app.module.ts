import imageConfig from 'src/configs/image.config';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { S3Module } from './s3/s3.module';
import { Module } from '@nestjs/common';
import { ValidationModule } from './validation/validation.module';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: ".env.local",
        load: [imageConfig]
    }), S3Module, ValidationModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

