import { UpdateUserDto, CreateUserDto, UserDto } from '../dtos';

export interface UserServiceInterface {

    /** 使用 user id 查詢使用者
     *
     * @param id user id
     * @returns user
     */
    getUserById(id: string): Promise<UserDto>;

    /** 新增使用者
     *
     * @param newUser new user
     * @param userId update user id
     * @returns new user list
     */
    createUser(newUser: CreateUserDto, userId: string): Promise<UserDto>;

    /**更新使用者
     *
     * @param id user id
     * @param oldUser edit user
     * @param userId update user id
     * @returns user list
     */
    updaterUser(
        id: string,
        oldUser: UpdateUserDto,
        userId: string,
    ): Promise<UserDto>;

    /**刪除使用者
     *
     * @param id user id
     * @returns user list
     */
    deleteUser(id: string): Promise<UserDto>;
}