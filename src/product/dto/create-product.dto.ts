import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @ApiProperty({description: 'Nome do produto'})
    @IsString()
    produto:        string;

    @ApiProperty({description: 'Preço do produto'})
    @IsNumber()
    preco:          number;
    
    @ApiProperty({description: 'Categoria do produto (Ex: Refrigerante, Pizza, Lanche...)'})
    @IsString()
    categoria:      string;
    
    @ApiProperty({description: 'A URL do caminho da imagem do produto...'})
    @IsString()
    imagem_produto: string;
}