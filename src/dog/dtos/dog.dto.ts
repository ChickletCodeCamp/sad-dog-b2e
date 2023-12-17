import { ApiProperty } from "@nestjs/swagger";

export class DogDto {
    @ApiProperty({
        description: '狗牌',
        maxLength: 50
    })
    dogId: string;

    @ApiProperty({
        description: '狗名',
        maxLength: 50
    })
    name: string;

    @ApiProperty({
        description: '狗命',
        default: 48
    })
    heart: number;

    @ApiProperty({
        description: '品種',
        maxLength: 10
    })
    type: string;
}