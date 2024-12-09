import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class EmailVerificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addEmailVerificationToken(
    userId: number,
    token: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.prisma.emailVerification.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  public async markVerificationAsUsed(id: number): Promise<void> {
    await this.prisma.emailVerification.update({
      where: { id },
      data: { verifiedAt: new Date() },
    });
  }

  public async findAllVerifications() {
    return this.prisma.emailVerification.findMany({
      include: { user: true },
    });
  }
}
