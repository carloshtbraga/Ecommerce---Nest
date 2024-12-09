import { UserConfirmEmailInput } from '../inputs/user-email-confirm.input';

export class UserConfirmEmailCommand {
  public constructor(public readonly input: UserConfirmEmailInput) {}
}
