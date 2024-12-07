export interface IEmailService {
  send(args: {
    to: string;
    subject: string;
    content: string;
  }): Promise<boolean>;
}
