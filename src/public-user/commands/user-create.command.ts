import { CreateUserInput } from '../inputs/user-create.input';

export class CreateUserCommand {
  constructor(public readonly input: CreateUserInput) {}
}
