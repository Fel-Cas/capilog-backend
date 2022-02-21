import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/constants';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
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
    await app.listen(port);
    logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
