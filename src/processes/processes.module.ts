import { Module } from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { ProcessesController } from './processes.controller';
import { Process } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityModule } from 'src/ability/ability.module';
import { FarmsService } from 'src/farms/farms.service';

@Module({
  imports:[TypeOrmModule.forFeature([Process]), AbilityModule],
  controllers: [ProcessesController],
  providers: [ProcessesService],
  exports: [ProcessesService]
})
export class ProcessesModule {}

