import { UserEntity, RoleEntity, UserRoleEntity } from "./entities";
import { DataSource, Repository } from 'typeorm';
import { UserRepositoryInterface } from "./interfaces/user.repository.interface";
import { UserRoleSchema, UserSchema } from "./schema";
import { InjectRepository } from "@nestjs/typeorm";

export class UserRepository implements UserRepositoryInterface {

    constructor(
        private readonly userSchema: UserSchema,
        private readonly userRoleSchema: UserRoleSchema,
        private readonly dataSource: DataSource,
        @InjectRepository(UserEntity)
        private readonly userDao: Repository<UserEntity>,
    ) { }

    async readById(id: string): Promise<UserEntity> {

        return await this.userDao.findOne({
            where: {
                userId: id
            }
        });
    }
    async create(data: UserEntity): Promise<UserEntity> {

        return await this.dataSource.transaction(async transactionalEntityManager => {

            // 寫入 user
            const newUser = await transactionalEntityManager.getRepository(UserEntity)
                .createQueryBuilder(this.userSchema.tableName)
                .insert()
                .into(UserEntity)
                .values([data])
                .returning(this.userSchema.schema)
                .execute()
                .then(result => result.raw[0] as UserEntity);

            // find role
            const role = await transactionalEntityManager.getRepository(RoleEntity)
                .findOneBy({ role: 'User' });

            // insert user-role
            await transactionalEntityManager.getRepository(UserRoleEntity)
                .createQueryBuilder(this.userRoleSchema.tableName)
                .insert()
                .into(UserRoleEntity)
                .values([{ roleId: role.roleId, userId: newUser.userId }])
                .execute();

            return newUser;
        });
    }
    async update(data: UserEntity): Promise<UserEntity> {

        // 1. 先建立 dataSource 的物件
        const queryBuilder = this.dataSource
            .getRepository(UserEntity)
            .createQueryBuilder(this.userSchema.tableName);

        const userId = data.userId;

        // 2. 將資料寫入 db（將資料更新到資料庫中）
        const result = await queryBuilder
            .update<UserEntity>(UserEntity, data) // 更新資料
            .set({
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                userName: data.userName,
                sex: data.sex,
                age: data.age,
                updateTime: data.updateTime,
                updateUserId: userId,
            })
            .where(this.userSchema.tableName + '."userId" = :userId', { userId: userId }) // 指定更新條件（根據 id）
            .returning(this.userSchema.schema) // 返回的資料模型或結構
            .updateEntity(true) // 更新實體（true表示執行更新操作）
            .execute()
            .then(result => result.raw[0] as UserEntity); // 執行操作並獲取結果

        return result;
    }
    async delete(id: string): Promise<UserEntity> {
        return await this.dataSource.transaction(async transactionalEntityManager => {

            // delete user-role
            await transactionalEntityManager.getRepository(UserRoleEntity)
                .createQueryBuilder(this.userRoleSchema.tableName)
                .delete() // 刪除資料
                .where(this.userRoleSchema.tableName + '."userId" = :userId', { userId: id }) // 指定更新條件                
                .execute(); // 執行操作並獲取結果

            // delete user
            const delUser = await transactionalEntityManager.getRepository(UserEntity)
                .createQueryBuilder()
                .delete() // 刪除資料
                .where(this.userRoleSchema.tableName + '."userId" = :userId', { userId: id }) // 指定更新條件
                .returning(this.userSchema.schema)
                .execute()
                .then(result => result.raw[0] as UserEntity);

            return delUser;
        });
    }
}