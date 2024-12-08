import { Global, Module } from '@nestjs/common';
import { JwtModule as BaseJwtModule } from '@nestjs/jwt';
import { EnvModule } from '@src/env/env.module';
import { EnvService } from '@src/env/env.service';

@Global()
@Module({
  imports: [
    EnvModule,
    BaseJwtModule.registerAsync({
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        secret: envService.JWT_ACCESS_SECRET,
      }),
    }),
  ],
  exports: [BaseJwtModule],
})
export class JwtModule {}
