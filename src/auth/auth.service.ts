import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepositoryInterface, AuthServiceInterface, TokenPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserDto, GetUserDto } from './dtos';
import { ConfigService } from '@nestjs/config';
import { BcryptServiceInterface } from '@app/bcrypt';
import { UserEntity } from 'src/user/entities';

@Injectable()
export class AuthService implements AuthServiceInterface {

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        @Inject('AuthRepositoryInterface')
        private readonly authRepo: AuthRepositoryInterface,
        @Inject('BcryptServiceInterface')
        private readonly bcryptService: BcryptServiceInterface
    ) { }

    /**驗證使用者
     * 
     * @param user 帳號密碼 
     * @returns 使用者id
     */
    private async verifyUser(user: UserDto): Promise<string> {
        // 查詢使用者
        const dbUser = await this.authRepo.getUserByEmail(user.email);

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

        return dbUser.userId;
    }

    private genToken(id: string): string {
        // 密碼正確，開始產生 Token
        const tokenPayload: TokenPayload = {
            userId: id,
        };

        return this.jwtService.sign(tokenPayload, {
            expiresIn: this.configService.get<number>('JWT_EXPIRATION'),
        });
    }

    async login(user: UserDto, response: Response<any, Record<string, any>>): Promise<void> {

        // 驗證使用者
        const dbUserId: string = await this.verifyUser(user);

        const token: string = this.genToken(dbUserId);

        response.cookie('Authentication', token, {
            httpOnly: true,
            expires: new Date(new Date().getTime() + this.configService.get<number>('JWT_EXPIRATION') * 1000),
        });
    }

    logout(response: Response<any, Record<string, any>>): void {
        response.cookie('Authentication', '', {
            httpOnly: true,
            expires: new Date(),
        });
    }
}
