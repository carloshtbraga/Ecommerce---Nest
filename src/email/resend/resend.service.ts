import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { IEmailService } from '../email-service.interface';
import { EnvService } from '@src/env/env.service';
@Injectable()
export class ResendService implements IEmailService {
  private readonly resend: Resend;

  constructor(private readonly envService: EnvService) {
    this.resend = new Resend(this.envService.RESEND_API_KEY);
  }

  public async send(args: {
    to: string;
    subject: string;
    content: string;
  }): Promise<boolean> {
    return this.resend.emails
      .send({
        from: this.envService.ADMIN_EMAIL,
        to: args.to,
        subject: args.subject,
        html: args.content,
      })
      .then(() => true)
      .catch(() => false);
  }
}
