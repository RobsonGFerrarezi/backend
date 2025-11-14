import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateCarrinhoDto {
    @ApiProperty({ description: 'ID do usuário dono do carrinho' })
    @IsNumber()
    userId: number;
}
