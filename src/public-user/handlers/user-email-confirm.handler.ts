import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerificationService } from '@src/services/verification/verification.service';
import { UserRepository } from '@src/db/user.repository';
import { UserConfirmEmailCommand } from '../commands/user-email-confirm.command';
import { UserStatus } from '@prisma/client';

@CommandHandler(UserConfirmEmailCommand)
export class UserConfirmEmailHandler
  implements ICommandHandler<UserConfirmEmailCommand>
{
  constructor(
    private readonly verificationService: VerificationService,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(command: UserConfirmEmailCommand): Promise<boolean> {
    const { token } = command.input;

    const slug =
      await this.verificationService.validateEmailVerificationToken(token);

    await this.userRepository.update({
      where: { slug },
      data: {
        emailConfirmedAt: new Date(),
        status: UserStatus.Activated,
      },
    });

    return true;
  }
}
