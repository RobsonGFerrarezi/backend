import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UpdateItemDto {
    @ApiProperty({ description: 'Nova quantidade do produto' })
    @IsNumber()
    quantidade: number;
}
