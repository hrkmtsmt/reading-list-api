import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  controllers: [BookController],
  providers: [BookService, PrismaService],
})
export class BookModule {}
