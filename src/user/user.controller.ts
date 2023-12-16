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
        return await this.userService.createUser(createCatDto, '');
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCatDto: UpdateUserDto) {
        return await this.userService.updaterUser(id, updateCatDto, '');
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.deleteUser(id);
    }
}