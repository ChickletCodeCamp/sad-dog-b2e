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

    /**驗證
     * 
     * @param email 信箱
     * @param password 密碼
     */
    validateUser(email: string, password: string): Promise<void>;

    /**取得使用者資訊
     * 
     * @param userId 
     */
    getUserById(userId: string): Promise<GetUserDto>;
}
