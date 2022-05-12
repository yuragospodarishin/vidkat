import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ErrorEnum } from '../enums/error.enum';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const token = request.headers.authorization;

      if (!token) {
        throw new UnauthorizedException(ErrorEnum.NOT_AUTHORIZED);
      }

      const user = this.jwtService.verify(token);

      request.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException(ErrorEnum.NOT_AUTHORIZED);
    }
  }
}
