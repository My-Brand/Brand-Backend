import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { setupDocs } from './swagger.config';

export const configureApp = (app: INestApplication) => {
  app.use(helmet());
  app.enableCors({
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie, Cookies',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api');
  setupDocs(app);
};
