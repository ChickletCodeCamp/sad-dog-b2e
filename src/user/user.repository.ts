import { UserEntity, RoleEntity, UserRoleEntity } from "./entities";
import { DataSource, Repository } from 'typeorm';
import { UserRepositoryInterface } from "./interfaces/user.repository.interface";
import { RoleSchema, UserRoleSchema, UserSchema } from "./schema";
import { InjectRepository } from "@nestjs/typeorm";

export class UserRepository implements UserRepositoryInterface {

    constructor(
        private readonly userSchema: UserSchema,
        private readonly roleSchema: RoleSchema,
        private readonly userRoleSchema: UserRoleSchema,
        private readonly dataSource: DataSource,
        @InjectRepository(UserEntity)
        private readonly userDao: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleDao: Repository<RoleEntity>,
        @InjectRepository(UserRoleEntity)
        private readonly userRoleDao: Repository<UserRoleEntity>,
    ) { }


    readById(id: string): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    create(data: UserEntity): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    update(data: UserEntity, updateId: string): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string, updateId: string): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
}