// src/user/user.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/user-create.command';
import { CreateUserInput } from './inputs/user-create.input';
import { User } from './user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(input));
  }

  @Query(() => String, { name: 'hello' })
  hello(): string {
    return 'Hello World!';
  }
}
