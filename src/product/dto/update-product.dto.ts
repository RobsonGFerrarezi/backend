import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto{
    @ApiProperty({description: 'O novo nome do produto, pode ser null se não houver alterações a serem feitas'})
    @IsString()
    @IsOptional()
    produto?:           string;

    @ApiProperty({description: 'O preço do produto, pode ser null se não houver alterações a serem feitas'})
    @IsNumber()
    @IsOptional()
    preco?:             number;

    @ApiProperty({description: 'A categoria do produto, pode ser null se não houver alterações a serem feitas'})
    @IsString()
    @IsOptional()
    categoria?:         string;

    @ApiProperty({description: 'A URL da imagem do produto, pode ser null se não houver alterações a serem feitas'})
    @IsString()
    @IsOptional()
    imagem_produto?:    string;
}