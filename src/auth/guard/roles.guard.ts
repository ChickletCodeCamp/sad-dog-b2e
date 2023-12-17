import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorator/roles.decorator';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector,
        private readonly configService: ConfigService) { }

    canActivate(context: ExecutionContext): boolean {
        const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requireRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const cookieString = request.headers.cookie;

        if (!cookieString) {
            return false; // No cookie found
        }

        let authenticationToken = null;
        const cookies = cookieString.split(';').map(cookie => cookie.trim());
        const authCookie = cookies.find(cookie => cookie.startsWith('Authentication='));
        if (authCookie) {
            authenticationToken = authCookie.split('=')[1];
        }

        if (!authenticationToken) {
            return false; // Authentication token not found
        }

        let user;
        try {
            const secret = this.configService.get<string>('JWT_SECRET');
            user = jwt.verify(authenticationToken, secret); // Verify the token
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                // 特別處理令牌過期的情況
                console.error('令牌已過期:', err.expiredAt);
                return false;
            }
            console.error('JWT 驗證錯誤:', err);
            return false; // 其他原因的無效令牌
        }

        // If token is valid, attach user to request and proceed
        request.user = user;

        return requireRoles.some(role => user.roles?.includes(role));
    }
}
