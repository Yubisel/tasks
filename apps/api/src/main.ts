import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1.0', { exclude: ['docs'] });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Tasks')
    .setDescription('Tasks management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    // customfavIcon: '/custom.ico',
    // customCssUrl: '/custom.css',
  });

  await app.listen(configService.get('PORT'), () =>
    logger.log(`Server up and listen on port ${configService.get('PORT')}`),
  );
}
bootstrap();
