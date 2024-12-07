import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { PrismaService } from '../../prisma/prisma.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const { email, password } = command.data;

    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        status: 'Created',
      },
    });

    return user;
  }
}
