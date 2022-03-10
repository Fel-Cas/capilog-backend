import { Module } from '@nestjs/common';
import { OrderStatementsService } from './order-statements.service';
import { OrderStatementsController } from './order-statements.controller';

@Module({
  controllers: [OrderStatementsController],
  providers: [OrderStatementsService]
})
export class OrderStatementsModule {}
