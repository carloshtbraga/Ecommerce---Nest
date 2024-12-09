import { Module } from '@nestjs/common';
import { CryptographyService } from '@src/cryptography/cryptography.service';
import { UserRepository } from '@src/db/user.repository';
import { PrismaModule } from '@src/prisma/prisma.module';
import { VerificationService } from './verification.service';
import { EmailVerificationRepository } from '@src/db/email-verification.repository';
import { PasswordResetRepository } from '@src/db/password-reset-repository';

@Module({
  imports: [PrismaModule],
  providers: [
    VerificationService,
    UserRepository,
    EmailVerificationRepository,
    CryptographyService,
    PasswordResetRepository,
  ],
  exports: [VerificationService],
})
export class VerificationModule {}
