import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderStatementsService } from './order-statements.service';
import { CreateOrderStatementDto } from './dto/create-order-statement.dto';
import { UpdateOrderStatementDto } from './dto/update-order-statement.dto';

@Controller('order-statements')
export class OrderStatementsController {
  constructor(private readonly orderStatementsService: OrderStatementsService) {}

  @Post()
  create(@Body() createOrderStatementDto: CreateOrderStatementDto) {
    return this.orderStatementsService.create(createOrderStatementDto);
  }

  @Get()
  findAll() {
    return this.orderStatementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderStatementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderStatementDto: UpdateOrderStatementDto) {
    return this.orderStatementsService.update(+id, updateOrderStatementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderStatementsService.remove(+id);
  }
}
