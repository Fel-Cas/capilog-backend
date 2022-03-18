/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { OrderStatementsService } from './order-statements.service';
import { CreateOrderStatementDto } from './dto/create-order-statement.dto';
import { UpdateOrderStatementDto } from './dto/update-order-statement.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { ONE_ORDER_STATEMENT, ORDER_STATEMENT_CREATED, ORDER_STATEMENT_DELETED, ORDER_STATEMENT_UPDATED } from 'src/common/messages';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { CheckAbilities } from 'src/common/decorators';
import { Action } from 'src/ability/enums/actions.enums';
import { OrderStatement } from './entities';

@Controller('order-statements')
export class OrderStatementsController {
  constructor(private readonly orderStatementsService: OrderStatementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: OrderStatement })
  async create(@Body() createOrderStatementDto: CreateOrderStatementDto) {
    const data= await this.orderStatementsService.create(createOrderStatementDto);
    return {meta:{message: ORDER_STATEMENT_CREATED}, data:{...data}};
  }

  @Get()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: OrderStatement })
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
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.ReadOne, subject: OrderStatement })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data= await this.orderStatementsService.findOne(id);
    return {meta:{message: ONE_ORDER_STATEMENT}, data:{...data}};
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: OrderStatement })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderStatementDto: UpdateOrderStatementDto) {
    const data= await this.orderStatementsService.update(+id, updateOrderStatementDto);
    return {meta:{message: ORDER_STATEMENT_UPDATED}, data:{...data}}
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: OrderStatement })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.orderStatementsService.remove(id);
    return {meta:{message: ORDER_STATEMENT_DELETED}}
  }
}
