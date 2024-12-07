import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public findBySlugOrThrow(slug: string): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({
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
    return this.prismaService.user.findFirstOrThrow({
      where: {
        email: email,
      },
    });
  }

  public async findFirst(args: Prisma.UserFindFirstArgs): Promise<User | null> {
    return this.prismaService.user.findFirst(args);
  }

  public async findFirstByEmail(email: string): Promise<User | null> {
    return this.findFirst({
      where: {
        email: email,
      },
    });
  }

  public async create(args: Prisma.UserCreateArgs): Promise<User> {
    try {
      return await this.prismaService.user.create(args);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new Error(
          `O email '${args.data.email}' já está cadastrado no sistema.`,
        );
      }
      throw error;
    }
  }
}
