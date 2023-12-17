import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthServiceInterface, TokenPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.Authentication;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    try {
      const user = await this.authService.getUserById(userId);
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
