import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Products')
@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Post()
    @ApiOperation({summary: 'Cria um novo produto.'})
    create(@Body() data: CreateProductDto) {
        return this.productService.create(data);
    }

    @Get()
    @ApiOperation({summary: 'Lista todos os produtos.'})
    findAll(){
        return this.productService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Busca um produto por ID'})
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.productService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Edita um produto, campos podem ser nulos. Busca pelo ID'})
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateProductDto,){
        return this.productService.update(id, data);
    }
}
