import { Module } from '@nestjs/common';
import { TypeOrdersService } from './type-orders.service';
import { TypeOrdersController } from './type-orders.controller';

@Module({
  controllers: [TypeOrdersController],
  providers: [TypeOrdersService]
})
export class TypeOrdersModule {}
