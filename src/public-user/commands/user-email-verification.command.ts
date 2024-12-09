import { UserSendEmailVerificationInput } from '../inputs/user-email-verification.input';

export class UserSendEmailVerificationCommand {
  public constructor(public readonly input: UserSendEmailVerificationInput) {}
}
