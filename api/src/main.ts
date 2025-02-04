import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
    cors: true,
  });
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder().setTitle(process.env.API_TITLE).setDescription(process.env.API_DESCRIPTION).setVersion(process.env.API_VERSION).build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/doc', app, document);
  }
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
