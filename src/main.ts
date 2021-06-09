import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { global } from './_shared_/config/env.config';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './_shared_/config/logger.config';
import { handleProcessErrors } from './_shared_/utils';
import { configureApp } from './_shared_/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig),
  });
  const logger = new Logger('Main');
  handleProcessErrors(app, logger);
  configureApp(app);

  await app.listen(global.port, '0.0.0.0', () =>
    logger.log('Server running on port ' + global.port + '...'),
  );
}
bootstrap();
