import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  public async findAllBook({ userId }: Partial<Book>) {
    return this.prisma.book.findMany({
      where: { userId },
    });
  }

  public async findBook({ id }: Partial<Book>) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  public async createBook({ url, userId, title }: Partial<Book>) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return { message: 'ユーザーが見つかりませんでした。' };
    }

    if (title) {
      return this.prisma.book.create({ data: { url, userId, title } });
    }

    return this.prisma.book.create({
      data: { url, userId, title: 'Untitled' },
    });
  }
}
