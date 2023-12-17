import { Inject, Injectable } from '@nestjs/common';
import { UserServiceInterface } from './interfaces/user.service.interface';
import { UpdateUserDto, CreateUserDto, UserDto } from './dtos';
import { UserRepositoryInterface } from './interfaces/user.repository.interface';
import { ClockServiceInterface } from '@app/clock';
import { UserEntity } from './entities';
import { SexType } from './enums';
import { UUIDServiceInterface } from '@app/uuid';
import { BcryptServiceInterface } from '@app/bcrypt';

@Injectable()
export class UserService implements UserServiceInterface {

    constructor(
        @Inject('UserRepositoryInterface')
        private readonly userRepo: UserRepositoryInterface,
        @Inject('ClockServiceInterface')
        private readonly clockService: ClockServiceInterface,
        @Inject('UUIDServiceInterface')
        private readonly uuidService: UUIDServiceInterface,
        @Inject('BcryptServiceInterface')
        private readonly bcryptService: BcryptServiceInterface
    ) { }

    /** 使用 user id 查詢使用者
     *
     * @param id user id
     * @returns user
     */
    async getUserById(userId: string): Promise<UserDto> {
        if (userId === '')
            throw new Error('userId 不可為空');

        const user = await this.userRepo.readById(userId);

        return {
            userId: user.userId,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            userName: user.userName,
            sex: user.sex as SexType,
            age: user.age,
        };
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

        const d = new Date(this.clockService.getDateTime());

        const hashedPassword = this.bcryptService.genHash(newUser.password);

        const createUser: UserEntity = await this.userRepo.create({
            fullName: newUser.fullName,
            email: newUser.email,
            password: hashedPassword,
            phoneNumber: newUser.phoneNumber,
            userName: newUser.userName,
            sex: newUser.sex,
            age: newUser.age,
            isEmailCheck: false,
            ban: false,
            createTime: d,
            updateTime: d,
            updateUserId: userId,
            userId: await this.uuidService.getUUID()
        });

        return {
            userId: createUser.userId,
            fullName: createUser.fullName,
            email: createUser.email,
            phoneNumber: createUser.phoneNumber,
            userName: createUser.userName,
            sex: createUser.sex as SexType,
            age: createUser.age,
        };
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
        const d = new Date(this.clockService.getDateTime());

        const updateUser: UserEntity = await this.userRepo.update({
            fullName: oldUser.fullName,
            email: oldUser.email,
            phoneNumber: oldUser.phoneNumber,
            userName: oldUser.userName,
            sex: oldUser.sex,
            age: oldUser.age,
            updateTime: d,
            updateUserId: userId,
            userId: id,
            password: null,
            isEmailCheck: null,
            ban: null,
            createTime: null
        });

        return {
            userId: updateUser.userId,
            fullName: updateUser.fullName,
            email: updateUser.email,
            phoneNumber: updateUser.phoneNumber,
            userName: updateUser.userName,
            sex: updateUser.sex as SexType,
            age: updateUser.age,
        };
    }

    /**刪除使用者
     *
     * @param id user id
     * @returns user list
     */
    async deleteUser(userId: string): Promise<UserDto> {
        const deleteUser: UserEntity = await this.userRepo.delete(userId);

        return {
            userId: deleteUser.userId,
            fullName: deleteUser.fullName,
            email: deleteUser.email,
            phoneNumber: deleteUser.phoneNumber,
            userName: deleteUser.userName,
            sex: deleteUser.sex as SexType,
            age: deleteUser.age,
        };
    }
}