import { GetUserDto, UserDto } from '../dtos';
import { Response } from 'express';


export interface AuthServiceInterface {

    /**登入
     * 
     * @param user 使用者資訊
     * @param response session
     */
    login(user: UserDto, response: Response): Promise<void>;

    /**登出
     * 
     * @param response session
     */
    logout(response: Response): void;
}
