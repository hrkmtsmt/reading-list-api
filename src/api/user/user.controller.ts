import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findUser(@Param() { id }: { id: string }) {
    const { email } = await this.userService.findUser(Number(id));
    return { email };
  }

  @Post()
  async createUser(
    @Body() { email, password }: { email: string; password: string },
  ) {
    return this.userService.createUser({ email, password });
  }
}
