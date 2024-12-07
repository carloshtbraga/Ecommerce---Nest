import { Module } from '@nestjs/common';
import { CryptographyModule } from '@src/cryptography/cryptography.module';
import { DbProviders } from '@src/db/db.provider';
import { PrismaModule } from '@src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, CryptographyModule],
  providers: DbProviders,
  exports: DbProviders,
})
export class DbModule {}
