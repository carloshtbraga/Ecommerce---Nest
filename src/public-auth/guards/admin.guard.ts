import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserGuard } from '@src/public-auth/guards/user.guard';
import { RoleType } from '@prisma/client';

@Injectable()
export class AdminGuard extends UserGuard {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = super.getRequest(context);

    const isUserAuthenticated = await super.canActivate(context);

    if (!isUserAuthenticated) {
      return false;
    }

    const user = request.user as User & {
      userRoles: { role: { name: RoleType } }[];
    };

    if (
      user?.userRoles?.some((role) => role.role.name === RoleType.Administrator)
    ) {
      return true;
    }

    throw new ForbiddenException(
      'Você não tem permissão para acessar este recurso.',
    );
  }
}
