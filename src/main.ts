/* eslint-disable prettier/prettier */
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/constants';
import { HttpExceptionFilter } from './config/exceptions.filter';
import { generateTypeormConfigFile, setDefaultUser } from './scripts';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();
    const logger = new Logger();
    const config = app.get(ConfigService);
    const port = config.get(PORT);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    );
    generateTypeormConfigFile(config);

    setDefaultUser(config);
    await app.listen(port);
    logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
