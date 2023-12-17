import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [{
    provide: 'AuthServiceInterface',
    useClass: AuthService,
  }],
  controllers: [AuthController]
})
export class AuthModule { }
