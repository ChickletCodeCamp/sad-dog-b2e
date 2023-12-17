import { ApiProperty } from "@nestjs/swagger";

export class CreateDogDto {
    @ApiProperty({
        description: '狗名',
        maxLength: 50
    })
    name: string;

    @ApiProperty({
        description: '品種',
        maxLength: 10
    })
    type: string;
}