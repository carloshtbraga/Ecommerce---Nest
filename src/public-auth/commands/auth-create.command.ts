import { AuthCreateInput } from '@src/public-auth/inputs/auth-create.input';

export class AuthCreateCommand {
  public constructor(public readonly input: AuthCreateInput) {}
}
