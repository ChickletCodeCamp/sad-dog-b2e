import { UserEntity } from "src/user/entities";

export interface AuthRepositoryInterface {

    /**使用信箱查詢使用者
     * 
     * @param email 信箱
     */
    getUserByEmail(email: string): Promise<UserEntity>;

    /**使用UserId查詢權限
     * 
     * @param userId 
     */
    getRolesByUserId(userId: string): Promise<string[]>;
}