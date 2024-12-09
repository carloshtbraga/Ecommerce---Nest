import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class PasswordResetRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async addPasswordResetToken(
    userId: number,
    token: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.prisma.passwordReset.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  async markTokenAsUsed(id: number) {
    return this.prisma.passwordReset.update({
      where: { id },
      data: { usedAt: new Date() },
    });
  }

  public async findAllResets() {
    return this.prisma.passwordReset.findMany();
  }
}
