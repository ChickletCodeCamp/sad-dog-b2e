import { UserEntity } from "../entities/user.entity";

export interface UserRepositoryInterface {

    /**
     * 取得單一 user 的詳細資訊
     * @param id  user Id
     */
    readById(id: string): Promise<UserEntity>;

    /**
     *  建立 user 
     * @param name 新 user 名稱
     * @param createId 建立者Id
     */
    create(data: UserEntity): Promise<UserEntity>;

    /**
     * 更新名稱
     * @param name 新名稱
     * @param id  user Id
     * @param updateId 更新者Id
     */
    update(data: UserEntity): Promise<UserEntity>;

    /**
     * 驅除鎮民
     * @param id  user Id
     * @param updateId 更新者Id
     */
    delete(id: string): Promise<UserEntity>;
}