import { ApiProperty } from "@nestjs/swagger";

export class UpdateDogDto {
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
}