import { Module } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { FarmsController } from './farms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from './entities';
import { AbilityModule } from '../ability/ability.module';

@Module({
    imports: [TypeOrmModule.forFeature([Farm]), AbilityModule],
    controllers: [FarmsController],
    providers: [FarmsService],
    exports: [FarmsService],
})
export class FarmsModule {}
