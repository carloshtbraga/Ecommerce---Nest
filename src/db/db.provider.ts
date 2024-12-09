import { UserRepository } from '@src/db/user.repository';
import { PasswordResetRepository } from './password-reset-repository';
import { EmailVerificationRepository } from './email-verification.repository';

const DbProvider = {
  UserRepository,
  PasswordResetRepository,
  EmailVerificationRepository,
};

const DbProviders = Object.values(DbProvider);

export { DbProvider, DbProviders };
