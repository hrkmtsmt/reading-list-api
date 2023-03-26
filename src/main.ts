import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { PrismaService } from '@prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShoutDownHooks(app);
  await app.listen(3000);
}
bootstrap();
