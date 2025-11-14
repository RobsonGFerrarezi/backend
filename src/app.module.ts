import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CarrinhoModule } from './carrinho/carrinho.module';

@Module({
  imports: [DatabaseModule, ProductModule, UserModule, CarrinhoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
