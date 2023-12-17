import { Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthServiceInterface } from './interfaces';
import { UserDto } from './dtos';
import { CurrentUser } from './current-user.decorator';
import { JwtAuthGuard, LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AuthServiceInterface')
        private readonly authService: AuthServiceInterface
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @CurrentUser() user: UserDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        await this.authService.login(user, response);
        response.send(user);
    }

    @UseGuards(JwtAuthGuard)
    async validateUser({ user }: { user: UserDto; }) {
        return user;
    }
}
