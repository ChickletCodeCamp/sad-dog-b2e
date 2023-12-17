import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthServiceInterface } from '../interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface) {
    super({ usernameField: 'email' });
  }
  // async validate(email: string, password: string) {
  //   return this.authService.validateUser(email, password);
  // }
}
