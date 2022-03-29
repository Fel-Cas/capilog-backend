import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities';
import { FarmsModule } from 'src/farms/farms.module';
import { TypeOrdersModule } from 'src/type-orders/type-orders.module';
import { TrucksModule } from 'src/trucks/trucks.module';
import { OrderStatementsModule } from 'src/order-statements/order-statements.module';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        FarmsModule,
        TypeOrdersModule,
        TrucksModule,
        OrderStatementsModule,
        AbilityModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrdersModule {}
