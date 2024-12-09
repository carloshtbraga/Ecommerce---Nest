import { Injectable, NotFoundException } from '@nestjs/common';
import { generateCode } from '@src/utils/helpers/generate-code';
import { EmailVerificationRepository } from '@src/db/email-verification.repository';
import { PasswordResetRepository } from '@src/db/password-reset-repository';
import { CryptographyService } from '@src/cryptography/cryptography.service';

@Injectable()
export class VerificationService {
  constructor(
    private readonly emailVerificationRepository: EmailVerificationRepository,
    private readonly passwordResetRepository: PasswordResetRepository,
    private readonly cryptographyService: CryptographyService,
  ) {}

  public async createEmailVerificationToken(userId: number): Promise<string> {
    const token = generateCode(32);
    const hashedToken = await this.cryptographyService.hash(token);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.emailVerificationRepository.addEmailVerificationToken(
      userId,
      hashedToken,
      expiresAt,
    );

    return token;
  }

  public async createPasswordResetToken(userId: number): Promise<string> {
    const token = generateCode(32);
    const hashedToken = await this.cryptographyService.hash(token);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.passwordResetRepository.addPasswordResetToken(
      userId,
      hashedToken,
      expiresAt,
    );

    return token;
  }

  public async validateEmailVerificationToken(token: string): Promise<string> {
    const verifications =
      await this.emailVerificationRepository.findAllVerifications();

    for (const verification of verifications) {
      const isMatch = await this.cryptographyService.compare(
        token,
        verification.token,
      );
      if (isMatch) {
        if (verification.expiresAt < new Date()) {
          throw new Error('Token expirado');
        }

        if (verification.verifiedAt) {
          throw new Error('Token já utilizado');
        }

        await this.emailVerificationRepository.markVerificationAsUsed(
          verification.id,
        );

        return verification.user.slug;
      }
    }

    throw new NotFoundException('Token inválido');
  }

  public async validatePasswordResetToken(token: string): Promise<number> {
    const resets = await this.passwordResetRepository.findAllResets();

    for (const reset of resets) {
      const isMatch = await this.cryptographyService.compare(
        token,
        reset.token,
      );
      if (isMatch) {
        if (reset.expiresAt < new Date()) {
          throw new Error('Token expirado');
        }

        if (reset.usedAt) {
          throw new Error('Token já utilizado');
        }

        await this.passwordResetRepository.markTokenAsUsed(reset.id);

        return reset.userId;
      }
    }

    throw new Error('Token inválido');
  }
}
