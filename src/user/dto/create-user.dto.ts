import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto{
    @ApiProperty({description: 'Nome do usuário.'})
    @IsString()
    nome:       string;

    @ApiProperty({description: 'Email do usuário, obrigatório formato de email.'})
    @IsEmail()
    email:      string; 

    @ApiProperty({description: 'Telefone do usuário, tem que ser formato de telefone BR (00) 00000-0000, pode ser null.'})
    @IsPhoneNumber('BR')
    @IsOptional()
    telefone?:   string;
}