import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddItemDto {
    @ApiProperty({ description: 'ID do produto' })
    @IsNumber()
    productId: number;

    @ApiProperty({ description: 'Quantidade do produto', default: 1 })
    @IsNumber()
    quantidade: number;
}
