import { Logger, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { CryptographyService } from '@src/cryptography/cryptography.service';
import { UserRepository } from '@src/db/user.repository';
import { JwtModel } from '@src/jwt/jwt.model';
import { AuthCreateCommand } from '@src/public-auth/commands/auth-create.command';

@CommandHandler(AuthCreateCommand)
export class AuthCreateHandler implements ICommandHandler<AuthCreateCommand> {
  private logger = new Logger(AuthCreateHandler.name);

  public constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptographyService: CryptographyService,
    private readonly jwtService: JwtService,
  ) {}

  public async execute(command: AuthCreateCommand): Promise<JwtModel> {
    const { email, password } = command.input;

    const user = await this.userRepository.findByEmailOrThrow(email);

    const match = await this.cryptographyService.compare(
      password,
      user.password,
    );

    if (!match) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const payload = { sub: user.slug };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '2d' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
