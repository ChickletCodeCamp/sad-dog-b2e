import { Body, Controller, Get, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthServiceInterface } from './interfaces';
import { UserDto } from './dtos';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AuthServiceInterface')
        private readonly authService: AuthServiceInterface
    ) { }

    @ApiBody({ type: UserDto })
    @Post('login')
    async login(
        @Body() user: UserDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        await this.authService.login(user, response);
        response.send(user);
    }

    @Get('logout')
    logout(@Res({ passthrough: true }) response: Response,) {
        this.authService.logout(response);
    }
}
