import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './lib/logger';

async function AppInit() {
  const app = await NestFactory.create(AppModule,{
    logger: new Logger(),
    cors: true
  });
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });
  await app.listen(30001);
}
AppInit();