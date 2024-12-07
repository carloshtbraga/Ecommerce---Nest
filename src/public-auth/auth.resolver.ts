import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtModel } from '@src/jwt/jwt.model';
import { AuthCreateCommand } from '@src/public-auth/commands/auth-create.command';
import { AuthCreateInput } from '@src/public-auth/inputs/auth-create.input';

@Resolver()
export class AuthResolver {
  public constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => JwtModel)
  public async authCreate(
    @Args('input') input: AuthCreateInput,
  ): Promise<JwtModel> {
    return this.commandBus.execute(new AuthCreateCommand(input));
  }
}
