import { UpdateUserInput } from '../inputs/user-update.input';

export class UpdateUserCommand {
  constructor(
    public readonly userSlug: string,
    public readonly input: UpdateUserInput,
  ) {}
}
