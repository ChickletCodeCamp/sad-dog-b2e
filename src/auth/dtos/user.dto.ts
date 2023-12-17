import { ApiProperty } from "@nestjs/swagger";

export class UserDto {

    @ApiProperty({
        description: 'user email',
    })
    email: string;

    @ApiProperty({
        description: 'user password',
    })
    password: string;
}