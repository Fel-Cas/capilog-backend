/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrdersService } from './type-orders.service';
import { TypeOrdersController } from './type-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrder } from './entities';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
    imports: [TypeOrmModule.forFeature([TypeOrder]), AbilityModule],
    controllers: [TypeOrdersController],
    providers: [TypeOrdersService],
    exports: [TypeOrdersService],
})
export class TypeOrdersModule {}
