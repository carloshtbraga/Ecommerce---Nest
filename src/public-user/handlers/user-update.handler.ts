import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../commands/user-update.command';
import { UserRepository } from '@src/db/user.repository';
import { User } from '@prisma/client';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const { userSlug, input } = command;

    return await this.userRepository.update({
      where: { slug: userSlug },
      data: input,
    });
  }
}
