import { UserEntity } from "src/user/entities";
import { AuthRepositoryInterface } from "./interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class AuthRepository implements AuthRepositoryInterface {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userDao: Repository<UserEntity>,
    ) { }


    async getUserByEmail(email: string): Promise<UserEntity> {
        return await this.userDao.findOne({
            where: {
                email: email
            }
        });
    }
}