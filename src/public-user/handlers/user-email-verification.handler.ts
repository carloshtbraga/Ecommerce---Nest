import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { render } from '@react-email/render';
import { UserRepository } from '@src/db/user.repository';
import { IEmailService } from '@src/email/email-service.interface';
import emailVerification from '@src/email/resend/html/email-verification';
import { EmailService } from '@src/utils/token/service.token';
import { VerificationService } from '@src/services/verification/verification.service';
import { UserSendEmailVerificationCommand } from '../commands/user-email-verification.command';
import { EmailType } from '@src/email/email-type.enum';
import { UserStatus } from '@prisma/client';

@CommandHandler(UserSendEmailVerificationCommand)
export class UserSendEmailVerificationHandler
  implements ICommandHandler<UserSendEmailVerificationCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(EmailService) private readonly emailService: IEmailService,
    private readonly verificationService: VerificationService,
  ) {}

  public async execute(
    command: UserSendEmailVerificationCommand,
  ): Promise<boolean> {
    const { slug } = command.input;

    const user = await this.userRepository.findBySlugOrThrow(slug);

    const token = await this.verificationService.createEmailVerificationToken(
      user.id,
    );

    const content = await render(emailVerification(token));

    await this.emailService.send({
      to: user.email,
      subject: EmailType.EMAIL_VERIFICATION,
      content,
    });

    await this.userRepository.update({
      where: { slug },
      data: {
        pendingEmailConfirmationAt: new Date(),
        status: UserStatus.PendingEmailConfirmation,
      },
    });

    return true;
  }
}
