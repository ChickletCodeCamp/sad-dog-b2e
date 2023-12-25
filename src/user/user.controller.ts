import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Inject,
} from '@nestjs/common';
import { UpdateUserDto, CreateUserDto, UserDto } from './dtos';
import { UserServiceInterface } from './interfaces/user.service.interface';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@ApiTags('user')
// @Roles(Role.Admin, Role.Manager)
@Controller('user')
export class UserController {
    constructor(
        @Inject('UserServiceInterface')
        private readonly userService: UserServiceInterface,
    ) { }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserDto> {
        return await this.userService.getUserById(id);
    }

    @Post()
    async create(@Body() createCatDto: CreateUserDto) {
        return await this.userService.createUser(createCatDto, 'f7541155-a4ff-4ca2-bfc5-a82ad98e2e86');// TODO: get userId
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCatDto: UpdateUserDto) {
        return await this.userService.updaterUser(id, updateCatDto, 'f7541155-a4ff-4ca2-bfc5-a82ad98e2e86');// TODO: get userId
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.deleteUser(id);
    }
}