import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/user-create.command';
import { CryptographyService } from '@src/cryptography/cryptography.service';
import { UserRepository } from '@src/db/user.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly cryptographyService: CryptographyService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const { email, password } = command.input;

    const user = await this.userRepository.create({
      data: {
        email,
        password: await this.cryptographyService.hash(password),
      },
    });

    return user;
  }
}
