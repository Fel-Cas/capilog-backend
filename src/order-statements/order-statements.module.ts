import { Module } from '@nestjs/common';
import { OrderStatementsService } from './order-statements.service';
import { OrderStatementsController } from './order-statements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatement } from './entities';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
    imports: [TypeOrmModule.forFeature([OrderStatement]), AbilityModule],
    controllers: [OrderStatementsController],
    providers: [OrderStatementsService],
    exports: [OrderStatementsService],
})
export class OrderStatementsModule {}
