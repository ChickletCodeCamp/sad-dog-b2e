import { UserEntity } from "src/user/entities";

export interface AuthRepositoryInterface {

    /**使用信箱查詢使用者
     * 
     * @param email 信箱
     */
    getUserByEmail(email: string): Promise<UserEntity>;
}