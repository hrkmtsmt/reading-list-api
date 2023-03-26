import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(id: User['id']) {
    const { email } = await this.prisma.user.findUnique({
      where: { id },
    });

    return { email };
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

  async deleteUser({ id, password }: Partial<User>) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (password !== user.password) {
      return { message: 'パスワードが一致しませんでした。' };
    }

    try {
      await this.prisma.user.delete({
        where: { id },
      });

      return { message: `${user.email} を削除しました。` };
    } catch (e) {
      return { message: 'ユーザーが削除できませんでした。' };
    }
  }
}
