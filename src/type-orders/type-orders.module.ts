import { Module } from '@nestjs/common';
import { TypeOrdersService } from './type-orders.service';
import { TypeOrdersController } from './type-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrder } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([TypeOrder])],
    controllers: [TypeOrdersController],
    providers: [TypeOrdersService],
    exports: [TypeOrdersService],
})
export class TypeOrdersModule {}
