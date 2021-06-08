import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const config = new DocumentBuilder()
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    description: 'Access Token',
  })
  .setTitle('Issa portfolio api')
  .setDescription('The Issa portfolio api documentation')
  .setVersion('1.0.0')
  .build();

const customOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Issa portfolio api',
};

export function setupDocs(app: INestApplication): void {
  const document = SwaggerModule.createDocument(app, config);
  return SwaggerModule.setup('/api/swagger-ui', app, document, customOptions);
}
