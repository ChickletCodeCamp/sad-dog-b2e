import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({
        description: '使用者 id',
    })
    userId: string;

    @ApiProperty({
        description: '使用者全名',
    })
    fullName: string;

    @ApiProperty({
        description: 'user email',
    })
    email: string;

    @ApiProperty({
        description: '電話號碼',
        type: Number,
    })
    phoneNumber: number;

    @ApiProperty({
        description: '使用者名稱',
    })
    userName: string;
}