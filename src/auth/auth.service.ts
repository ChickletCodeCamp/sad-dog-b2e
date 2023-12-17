import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepositoryInterface, AuthServiceInterface, TokenPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserDto, GetUserDto } from './dtos';
import { ConfigService } from '@nestjs/config';
import { BcryptServiceInterface } from '@app/bcrypt';
import { UserEntity } from 'src/user/entities';
import { ClockServiceInterface } from '@app/clock';

@Injectable()
export class AuthService implements AuthServiceInterface {

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        @Inject('AuthRepositoryInterface')
        private readonly authRepo: AuthRepositoryInterface,
        @Inject('BcryptServiceInterface')
        private readonly bcryptService: BcryptServiceInterface,
        @Inject('ClockServiceInterface')
        private readonly clockService: ClockServiceInterface,
    ) { }

    /**驗證使用者
     * 
     * @param user 帳號密碼 
     * @returns 使用者id
     */
    private async verifyUser(user: UserDto): Promise<UserEntity> {
        // 查詢使用者
        const dbUser: UserEntity = await this.authRepo.getUserByEmail(user.email);

        // 檢查使用者是否存在
        if (!dbUser) {
            throw new UnauthorizedException('User not found');
        }

        // 驗證密碼
        const isPasswordValid = await this.bcryptService.compare(user.password, dbUser.password);

        // 密碼錯誤回傳權限不足
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return dbUser;
    }

    private async genToken(id: string, name: string): Promise<string> {

        const roles: string[] = await this.authRepo.getRolesByUserId(id);

        // 密碼正確，開始產生 Token
        const tokenPayload: TokenPayload = {
            userId: id,
            user: name,
            roles: roles
        };

        return this.jwtService.sign(tokenPayload);
    }

    async login(user: UserDto, response: Response<any, Record<string, any>>): Promise<void> {

        // 驗證使用者
        const dbUser: UserEntity = await this.verifyUser(user);

        const token: string = await this.genToken(dbUser.userId, dbUser.userName);

        const d: Date = new Date(new Date(this.clockService.getDateTime()).getTime() + this.configService.get<number>('JWT_EXPIRATION') * 1000);

        response.cookie('Authentication', token, {
            httpOnly: true,
            expires: d,
        });
    }

    logout(response: Response<any, Record<string, any>>): void {
        response.cookie('Authentication', '', {
            httpOnly: true,
            expires: new Date(),
        });
    }
}
