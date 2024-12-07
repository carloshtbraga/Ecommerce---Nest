// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUserHandler } from './handlers/create-user.handler';

const CommandHandlers = [CreateUserHandler];
const QueryHandlers: any[] = [];

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [UserResolver, ...CommandHandlers, ...QueryHandlers],
})
export class UserModule {}
