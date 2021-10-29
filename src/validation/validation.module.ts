import { ValidationService } from './validation.service';
import fileConfig from 'src/configs/file.config';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: ".env.local",
        load: [fileConfig]
    })],
    providers: [ValidationService],
    exports: [ValidationService]
})
export class ValidationModule {}
