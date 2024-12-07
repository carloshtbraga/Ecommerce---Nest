import { CreateUserInput } from '../inputs/create-user.input';

export class CreateUserCommand {
  constructor(public readonly data: CreateUserInput) {}
}
