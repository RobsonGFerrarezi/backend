import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({summary: 'Cria um novo usuário.'})
    create(@Body() data: CreateUserDto){
        return this.userService.create(data);
    }

    @Get()
    @ApiOperation({summary: 'Lista todos os usuários.'})
    findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Busca um usuário pelo ID.'})
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.userService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Edita um usuário, campos podem ser nulos. Busca pelo ID.'})
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto){
        return this.userService.update(id, data);
    }
}
