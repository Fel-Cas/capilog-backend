import { Module } from '@nestjs/common';
import { RouteOrdersService } from './route-orders.service';
import { RouteOrdersController } from './route-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteOrder } from './entities';
import { AbilityModule } from 'src/ability/ability.module';
import { TrucksModule } from 'src/trucks/trucks.module';
import { RoutesModule } from 'src/routes/routes.module';

@Module({
    imports: [TypeOrmModule.forFeature([RouteOrder]), AbilityModule, RoutesModule, TrucksModule],
    controllers: [RouteOrdersController],
    providers: [RouteOrdersService],
    exports: [RouteOrdersService],
})
export class RouteOrdersModule {}
