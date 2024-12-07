// src/user/user.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';
import { CreateUserInput } from './inputs/create-user.input';
import { User } from './user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(data));
  }

  @Query(() => String, { name: 'hello' })
  hello(): string {
    return 'Hello World!';
  }
}
