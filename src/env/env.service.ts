import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  public get IS_PRODUCTION() {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }

  public get IS_TEST() {
    return this.configService.get<string>('NODE_ENV') === 'test';
  }

  public get NODE_ENV() {
    return this.configService.get<string>('NODE_ENV') as
      | 'local'
      | 'test'
      | 'development'
      | 'production';
  }

  public get PORT() {
    return this.configService.get<number>('PORT');
  }

  public get JWT_ACCESS_SECRET() {
    return this.configService.get<string>('JWT_ACCESS_SECRET');
  }

  public get AWS_ACCESS_KEY_ID() {
    return this.configService.get<string>('AWS_ACCESS_KEY_ID');
  }

  public get AWS_SECRET_ACCESS_KEY() {
    return this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
  }

  public get AWS_REGION() {
    return this.configService.get<string>('AWS_REGION');
  }

  public get AWS_BUCKET_NAME() {
    return this.configService.get<string>('AWS_BUCKET_NAME');
  }

  public get RESEND_API_KEY() {
    return this.configService.get<string>('RESEND_API_KEY');
  }

  public get ADMIN_EMAIL() {
    return this.configService.get<string>('ADMIN_EMAIL');
  }
}
