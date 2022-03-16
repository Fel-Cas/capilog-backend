import { Module } from '@nestjs/common';
import { RouteOrdersService } from './route-orders.service';
import { RouteOrdersController } from './route-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteOrder } from './entities';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
    imports: [TypeOrmModule.forFeature([RouteOrder]), AbilityModule],
    controllers: [RouteOrdersController],
    providers: [RouteOrdersService],
    exports: [RouteOrdersService],
})
export class RouteOrdersModule {}
