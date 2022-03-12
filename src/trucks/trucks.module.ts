import { Module } from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { TrucksController } from './trucks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Truck } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Truck])],
    controllers: [TrucksController],
    providers: [TrucksService],
    exports: [TrucksService],
})
export class TrucksModule {}
