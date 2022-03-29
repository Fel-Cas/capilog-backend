import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities';
import { AbilityModule } from 'src/ability/ability.module';
import { FarmsModule } from 'src/farms/farms.module';


@Module({
    imports: [TypeOrmModule.forFeature([Route]), AbilityModule, FarmsModule],
    controllers: [RoutesController],
    providers: [RoutesService],
    exports: [RoutesService],
})
export class RoutesModule {}
