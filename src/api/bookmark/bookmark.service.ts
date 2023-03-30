import { Injectable } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';
import axios from 'axios';
import parse from 'node-html-parser';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  public async findAllBook({ userId }: Partial<Bookmark>) {
    return this.prisma.bookmark.findMany({
      where: { userId },
    });
  }

  public async findBook({ id }: Partial<Bookmark>) {
    return this.prisma.bookmark.findUnique({
      where: { id },
    });
  }

  public async createBook({ url, userId, title }: Partial<Bookmark>) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return { message: 'ユーザーが見つかりませんでした。' };
    }

    if (title) {
      return this.prisma.bookmark.create({ data: { url, userId, title } });
    }

    const { data: html } = await axios.get<string>(url);

    const bookmarkTitle = parse(html).querySelector('title').innerText;

    return this.prisma.bookmark.create({
      data: { url, userId, title: bookmarkTitle },
    });
  }
}
