import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(id: User['id']): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser({ email, password }: Partial<User>): Promise<User> {
    return this.prisma.user.create({ data: { email, password } });
  }

  async updateUser({ id, email, password }: Partial<User>) {
    return this.prisma.user.update({
      where: { id },
      data: { email, password },
    });
  }
}
