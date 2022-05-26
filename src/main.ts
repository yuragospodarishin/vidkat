import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Vidkatapi')
    .setDescription('Documentation Vidkatapi')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => console.log(`Server working on port ${port}`));
}
bootstrap();
