import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1.0', { exclude: ['docs'] });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Title example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    // customfavIcon: '/custom.ico',
    // customCssUrl: '/custom.css',
  });

  await app.listen(3000);
}
bootstrap();
