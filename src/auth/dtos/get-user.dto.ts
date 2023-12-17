import { ApiProperty } from "@nestjs/swagger";

export class GetUserDto {
    @ApiProperty({
        description: '使用者 id',
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
        description: '使用者名稱',
        maxLength: 50
    })
    userName: string;

    @ApiProperty({
        description: '年齡',
    })
    age: number;
}