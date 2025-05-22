import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());


  const config = new DocumentBuilder()
    .setTitle("Auth Microservice")
    .setDescription("API for user registration, login and protected routes")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}
bootstrap();
