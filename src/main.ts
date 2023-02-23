import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './lib/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new Logger(),
  });
  app.enableCors();
  await app.listen(30001);
}
bootstrap();