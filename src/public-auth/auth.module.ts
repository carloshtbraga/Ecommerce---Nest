import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CryptographyModule } from '@src/cryptography/cryptography.module';
import { DbModule } from '@src/db/db.module';
import { JwtModule } from '@src/jwt/jwt.module';
import { AuthResolver } from '@src/public-auth/auth.resolver';
import { AuthCreateHandler } from '@src/public-auth/handlers/auth-create.handler';

@Module({
  imports: [DbModule, CqrsModule, CryptographyModule, JwtModule],
  providers: [AuthCreateHandler, AuthResolver],
})
export class AuthModule {}
