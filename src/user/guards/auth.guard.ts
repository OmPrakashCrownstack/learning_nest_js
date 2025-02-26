import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const require = context.switchToHttp().getRequest();
    return require.session.userId;
  }
}
