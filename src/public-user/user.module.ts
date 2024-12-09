// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUserHandler } from './handlers/user-create.handler';
import { CryptographyModule } from '@src/cryptography/cryptography.module';
import { UserRepository } from '@src/db/user.repository';
import { UpdateUserHandler } from './handlers/user-update.handler';
import { UserConfirmEmailHandler } from './handlers/user-email-confirm.handler';
import { UserSendEmailVerificationHandler } from './handlers/user-email-verification.handler';
import { VerificationModule } from '@src/services/verification/verification.module';
import { EmailServiceProvider } from '@src/email/email-service.provider';

const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  UserConfirmEmailHandler,
  UserSendEmailVerificationHandler,
];
const QueryHandlers: any[] = [];

@Module({
  imports: [CqrsModule, PrismaModule, CryptographyModule, VerificationModule],
  providers: [
    UserResolver,
    ...CommandHandlers,
    ...QueryHandlers,
    UserRepository,
    EmailServiceProvider,
  ],
  exports: [UserRepository],
})
export class UserModule {}
