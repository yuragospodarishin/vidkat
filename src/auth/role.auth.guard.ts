import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorEnum } from '../enums/error.enum';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Observable } from 'rxjs';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRoles) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization;
      if (token === '') {
        throw new UnauthorizedException(ErrorEnum.NOT_AUTHORIZED);
      }

      const user = this.jwtService.verify(token);

      if (!user) {
        throw new UnauthorizedException(ErrorEnum.NOT_AUTHORIZED);
      }
      request.user = user;

      return requiredRoles.includes(user.role);
    } catch (e) {
      throw new ForbiddenException(ErrorEnum.FORBIDDEN);
    }
  }
}
