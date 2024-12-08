// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUserHandler } from './handlers/user-create.handler';
import { CryptographyModule } from '@src/cryptography/cryptography.module';
import { UserRepository } from '@src/db/user.repository';

const CommandHandlers = [CreateUserHandler];
const QueryHandlers: any[] = [];

@Module({
  imports: [CqrsModule, PrismaModule, CryptographyModule],
  providers: [
    UserResolver,
    ...CommandHandlers,
    ...QueryHandlers,
    UserRepository,
  ],
  exports: [UserRepository],
})
export class UserModule {}
