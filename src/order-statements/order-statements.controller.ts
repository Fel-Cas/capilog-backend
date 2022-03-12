/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { OrderStatementsService } from './order-statements.service';
import { CreateOrderStatementDto } from './dto/create-order-statement.dto';
import { UpdateOrderStatementDto } from './dto/update-order-statement.dto';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('order-statements')
export class OrderStatementsController {
  constructor(private readonly orderStatementsService: OrderStatementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createOrderStatementDto: CreateOrderStatementDto) {
    const data= await this.orderStatementsService.create(createOrderStatementDto);
    return {meta:{message:'Orders satatement created'}, data:{...data}};
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page=1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit=10
  ) {
    return this.orderStatementsService.findAll({
      page,
      limit,
      route: 'http://localhost:8000/order-statements'
    })
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data= await this.orderStatementsService.findOne(id);
    return {meta:{message:'One order statement'}, data:{...data}};
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderStatementDto: UpdateOrderStatementDto) {
    const data= await this.orderStatementsService.update(+id, updateOrderStatementDto);
    return {meta:{message:'order statement updated'}, data:{...data}}
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.orderStatementsService.remove(id);
    return {meta:{message:'order statement deleted'}}
  }
}
