import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
    imports: [TypeOrmModule.forFeature([Route]), AbilityModule],
    controllers: [RoutesController],
    providers: [RoutesService],
    exports: [RoutesService],
})
export class RoutesModule {}
