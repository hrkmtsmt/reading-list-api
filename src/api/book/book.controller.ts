import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  public async findAllBook(@Query('user_id') userId: string) {
    return this.bookService.findAllBook({ userId: Number(userId) });
  }

  @Get(':id')
  public async findBook(@Param('id') id: string) {
    return this.bookService.findBook({ id: Number(id) });
  }

  @Post()
  public async createBook(
    @Body()
    { url, userId, title }: { url: string; userId: number; title?: string },
  ) {
    return this.bookService.createBook({ url, userId, title });
  }
}
