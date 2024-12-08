import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public findBySlugOrThrow(slug: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { slug },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  public findByEmailOrThrow(email: string): Promise<User> {
    return this.prisma.user.findFirstOrThrow({
      where: {
        email: email,
      },
    });
  }

  public async create(args: Prisma.UserCreateArgs): Promise<User> {
    return await this.prisma.user.create(args);
  }
}
