import { Injectable } from '@nestjs/common';
import { UserServiceInterface } from './interfaces/user.service.interface';
import { UpdateUserDto, CreateUserDto, UserDto } from './dtos';

@Injectable()
export class UserService implements UserServiceInterface {

    /** 使用 user id 查詢使用者
     *
     * @param id user id
     * @returns user
     */
    async getUserById(userId: string): Promise<UserDto> {
        let user: UserDto = {
            userId: '80f78f75-37b5-4977-bffc-5afc5db99123',
            fullName: 'Pink Chicken',
            email: 'PinkChicken@local.com',
            phoneNumber: '0900000011',
            userName: 'Hi Chicken',
        };

        return user;
    }
    /** 新增使用者
     *
     * @param newUser new user
     * @param userId update user id
     * @returns new user list
     */
    async createUser(
        newUser: CreateUserDto,
        userId: string,
    ): Promise<UserDto> {
        let users = new UserDto();

        users = {
            userId: '591afd77-32d0-44c2-a487-b6bd8850a0fe',
            fullName: newUser.fullName,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            userName: newUser.userName,
        };

        return users;
    }

    /**更新使用者
     *
     * @param id user id
     * @param oldUser edit user
     * @param userId update user id
     * @returns user list
     */
    async updaterUser(
        id: string,
        oldUser: UpdateUserDto,
        userId: string,
    ): Promise<UserDto> {
        let user = new UserDto();

        user = {
            userId: 'f7541155-a4ff-4ca2-bfc5-a82ad98e2e86',
            fullName: oldUser.fullName,
            email: oldUser.email,
            phoneNumber: oldUser.phoneNumber,
            userName: oldUser.fullName,
        };

        return user;
    }

    /**刪除使用者
     *
     * @param id user id
     * @returns user list
     */
    async deleteUser(userId: string): Promise<UserDto> {
        let user = new UserDto();
        user = {
            userId: '80f78f75-37b5-4977-bffc-5afc5db99123',
            fullName: 'Pink Chicken',
            email: 'PinkChicken@local.com',
            phoneNumber: '0900000011',
            userName: 'Hi Chicken',
        };
        return user;
    }
}