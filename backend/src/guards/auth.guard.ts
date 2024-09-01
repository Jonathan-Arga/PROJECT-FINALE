import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

// auth guard
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(req: Request): Promise<boolean> {
    const token = this.extractTokenFromHeader(req);
    if (!token) return false;
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET || 'secret',
      });
      if (!user) return false;

      req.body.user = user;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
