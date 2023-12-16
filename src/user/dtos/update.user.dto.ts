import { ApiProperty } from '@nestjs/swagger';
import { SexType } from '../enums';

export class UpdateUserDto {
    @ApiProperty({
        description: 'user id',
    })
    userId: string;

    @ApiProperty({
        description: '使用者全名',
        maxLength: 50
    })
    fullName: string;

    @ApiProperty({
        description: 'user email',
        maxLength: 100
    })
    email: string;

    @ApiProperty({
        description: '電話號碼(非必填)',
    })
    phoneNumber: string;

    @ApiProperty({
        description: '使用者名稱',
        maxLength: 50
    })
    userName: string;

    @ApiProperty({
        description: '性別(男或女)',
        enum: ['Boy', 'Girl']
    })
    sex: SexType;

    @ApiProperty({
        description: '年齡',
    })
    age: number;
}