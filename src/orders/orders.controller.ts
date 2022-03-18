/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards';
import { ONE_ORDER, ORDER_CREATED, ORDER_DELETED, ORDER_UPDATED } from 'src/common/messages';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createOrderDto: CreateOrderDto, @User() user) {
    const data= await this.ordersService.create(createOrderDto, user);
    return {meta:{message:ORDER_CREATED}, data:{...data}};
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page=1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit=10
  ) {
    return this.ordersService.findAll({
      page,
      limit,
      route:'http://localhost:8000/orders'
    })
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data= await this.findOne(id)
    return {meta:{message:ONE_ORDER}, data:{...data}};
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    const data= await this.ordersService.update(id, updateOrderDto);
    return {meta:{message: ORDER_UPDATED}, data:{...data}};
  }

  @Put('trucks/:id')
  async updateTrucks(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    const data= await this.ordersService.updateTruck(id, updateOrderDto);
    return {meta:{message:ORDER_UPDATED}, data:{...data}};
  }

  @Put('farms/:id')
  async updateFarm(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    const data= await this.ordersService.updateFarm(id, updateOrderDto);
    return {meta:{message:ORDER_UPDATED}, data:{...data}};
  }

  @Put('statements/:id')
  async updateStatement(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    const data= await this.ordersService.updateStatement(id, updateOrderDto);
    return {meta:{message:ORDER_UPDATED}, data:{...data}};
  }

  @Put('type-orders/:id')
  async updateTypeOrder(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    const data= await this.ordersService.updateTypeOrder(id, updateOrderDto);
    return {meta:{message: ORDER_UPDATED}, data:{...data}};
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.ordersService.remove(id);
    return {meta:{message: ORDER_DELETED}};
  }
}
