import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.API_PREFIX || 'api');
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
