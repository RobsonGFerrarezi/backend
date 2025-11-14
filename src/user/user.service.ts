import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto) {
        const user = await this.prisma.user.create ({
            data: {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
            },
        });

        return user;
    }

    async findAll(){
        const users = await this.prisma.user.findMany();
        return users;
    }

    async findOne(id: number){
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            }
        });

        if(!user){
            throw new NotFoundException(`O usuário de ID ${id} não foi encontrado.`)
        }

        return user;
    }

    async update(id: number, data: UpdateUserDto){
        await this.findOne(id);

        const user = await this.prisma.user.update({
            where: {
                id: id,
            },
            data: data,
        });

        return user;
    }
}
