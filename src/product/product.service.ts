import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

    constructor(private prisma: PrismaService) { }

    async create(data: CreateProductDto) {
        const product = await this.prisma.product.create({
            data: {
                produto: data.produto,
                preco: data.preco,
                categoria: data.categoria,
                imagem_produto: data.imagem_produto,
            },
        });

        return product;
    }

    async findAll() {
        const products = await this.prisma.product.findMany();
        return products
    }

    async findOne(id: number){
        const product = await this.prisma.product.findUnique({
            where: {
                id: id,
            }
        });

        if (!product){
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`)
        }

        return product;
    }

    async update(id: number, data: UpdateProductDto){
        await this.findOne(id);

        const product = await this.prisma.product.update({
            where: {
                id: id,
            },
            data: data,
        });

        return product;
    }
}
