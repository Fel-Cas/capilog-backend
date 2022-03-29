import { Module } from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { TrucksController } from './trucks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Truck } from './entities';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
    imports: [TypeOrmModule.forFeature([Truck]), AbilityModule],
    controllers: [TrucksController],
    providers: [TrucksService],
    exports: [TrucksService],
})
export class TrucksModule {}
