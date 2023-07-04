import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const sessionUserId = request.user.id;
    const { userId: paramsUserId } = request.params;

    return sessionUserId === paramsUserId;
  }
}
