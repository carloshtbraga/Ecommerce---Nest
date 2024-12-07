import { Provider } from '@nestjs/common';
import { ResendService } from './resend/resend.service';
import { EmailService } from '../utils/token/service.token';

export const EmailServiceProvider: Provider = {
  provide: EmailService,
  useClass: ResendService,
};
