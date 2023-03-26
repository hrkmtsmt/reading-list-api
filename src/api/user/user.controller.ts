import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findUser(@Param() { id }: { id: User['id'] }) {
    const { email } = await this.userService.findUser(Number(id));
    return { email };
  }

  @Post()
  async createUser(@Body() { email, password }: User) {
    return this.userService.createUser({ email, password });
  }

  @Patch(':id')
  async updateUser(
    @Param() { id }: { id: User['id'] },
    @Body() { email, password }: Partial<User>,
  ) {
    return this.userService.updateUser({ id: Number(id), email, password });
  }
}
