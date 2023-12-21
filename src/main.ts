import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with credentials
  app.enableCors({
    origin: true, // You can specify your frontend origin here if needed
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('sad dog API')
    .setDescription('Nest sad dog API description')
    .setVersion('1.0')
    .addTag('sad dog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3055);
}
bootstrap();
