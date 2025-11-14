import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class CarrinhoService {

    constructor(private prisma: PrismaService) {}

    // Criar um carrinho para um usuário
    async create(data: CreateCarrinhoDto) {
        return this.prisma.carrinho.create({
            data: {
                userId: data.userId,
            },
            include: {
                itens: true,
            },
        });
    }

    // Buscar carrinho de um usuário
    async findByUser(userId: number) {
        const carrinho = await this.prisma.carrinho.findUnique({
            where: { userId },
            include: {
                itens: {
                    include: {
                        product: true,
                    }
                }
            }
        });

        if (!carrinho) {
            throw new NotFoundException(`Carrinho do usuário ${userId} não encontrado`);
        }

        return carrinho;
    }

    // Adicionar um item ao carrinho
    async addItem(userId: number, data: AddItemDto) {

        const carrinho = await this.findByUser(userId);

        const itemExistente = await this.prisma.carrinhoItem.findFirst({
            where: {
                carrinhoId: carrinho.id,
                productId: data.productId,
            }
        });

        if (itemExistente) {
            return this.prisma.carrinhoItem.update({
                where: { id: itemExistente.id },
                data: {
                    quantidade: itemExistente.quantidade + data.quantidade,
                }
            });
        }

        return this.prisma.carrinhoItem.create({
            data: {
                carrinhoId: carrinho.id,
                productId: data.productId,
                quantidade: data.quantidade
            }
        });
    }

    // Alterar quantidade
    async updateItem(userId: number, itemId: number, data: UpdateItemDto) {

        await this.findByUser(userId);

        return this.prisma.carrinhoItem.update({
            where: { id: itemId },
            data,
        });
    }

    // Remover item
    async removeItem(userId: number, itemId: number) {
        await this.findByUser(userId);

        return this.prisma.carrinhoItem.delete({
            where: { id: itemId }
        });
    }

    // Limpar carrinho
    async clear(userId: number) {
        const carrinho = await this.findByUser(userId);

        return this.prisma.carrinhoItem.deleteMany({
            where: { carrinhoId: carrinho.id }
        });
    }
}
