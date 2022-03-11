import { Module } from '@nestjs/common';
import { OrderStatementsService } from './order-statements.service';
import { OrderStatementsController } from './order-statements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatement } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([OrderStatement])],
    controllers: [OrderStatementsController],
    providers: [OrderStatementsService],
    exports: [OrderStatementsService],
})
export class OrderStatementsModule {}
