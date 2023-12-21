import { RoleEntity, UserEntity, UserRoleEntity } from "src/user/entities";
import { AuthRepositoryInterface } from "./interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

export class AuthRepository implements AuthRepositoryInterface {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userDao: Repository<UserEntity>,
        @InjectRepository(UserRoleEntity)
        private readonly userRoleDao: Repository<UserRoleEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleDao: Repository<RoleEntity>,
    ) { }

    async getRolesByUserId(userId: string): Promise<string[]> {
        // 從 user_role 表中獲取所有與 userId 相關的 roleId
        const userRoles = await this.userRoleDao.find({
            select: ["roleId"],
            where: { userId }
        });

        // 從 userRoles 中提取所有 roleId
        const roleIds = userRoles.map(userRole => userRole.roleId);

        // 如果沒有找到任何 roleId，返回空數組
        if (roleIds.length === 0) {
            return [];
        }

        // 使用提取的 roleId 查詢 roles 表以獲取角色名稱
        const roles = await this.roleDao.find({
            select: ["role"],
            where: { roleId: In(roleIds) } // 假設 this.roleDao 是 Role 實體的存儲庫
        });

        // 返回角色名稱數組
        return roles.map(role => role.role);
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        return await this.userDao.findOne({
            where: {
                email: email
            }
        });
    }
}