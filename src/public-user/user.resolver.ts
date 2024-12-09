// src/user/user.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/user-create.command';
import { CreateUserInput } from './inputs/user-create.input';
import { User } from '@prisma/client';
import { UserModel } from './user.model';
import { CurrentUser } from './decorators/current.user.decorator';
import { UpdateUserInput } from './inputs/user-update.input';
import { UpdateUserCommand } from './commands/user-update.command';
import { UserGuard } from '@src/public-auth/guards/user.guard';
import { UseGuards } from '@nestjs/common';
import { UserSendEmailVerificationInput } from './inputs/user-email-verification.input';
import { UserSendEmailVerificationCommand } from './commands/user-email-verification.command';
import { UserConfirmEmailInput } from './inputs/user-email-confirm.input';
import { UserConfirmEmailCommand } from './commands/user-email-confirm.command';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => UserModel)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(input));
  }

  @Query(() => String, { name: 'hello' })
  hello(): string {
    return 'Hello World!';
  }

  @UseGuards(UserGuard)
  @Mutation(() => UserModel, { name: 'updateUser' })
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.commandBus.execute(new UpdateUserCommand(user.slug, input));
  }

  @Mutation(() => Boolean)
  public async sendEmailVerification(
    @Args('input') input: UserSendEmailVerificationInput,
  ): Promise<boolean> {
    return this.commandBus.execute(new UserSendEmailVerificationCommand(input));
  }

  @Mutation(() => Boolean)
  public async confirmEmail(
    @Args('input') input: UserConfirmEmailInput,
  ): Promise<boolean> {
    return this.commandBus.execute(new UserConfirmEmailCommand(input));
  }
}
