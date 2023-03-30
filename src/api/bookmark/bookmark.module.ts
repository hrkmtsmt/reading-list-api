import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService, PrismaService],
})
export class BookModule {}
