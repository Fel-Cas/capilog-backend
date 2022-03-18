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
  @UseGuards(JwtAuthGuard)
  async create(@Body() createOrderDto: CreateOrderDto, @User() user) {
    const data= await this.ordersService.create(createOrderDto, user);
    return {meta:{message:ORDER_CREATED}, data:{...data}};
  }

  @Get()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data= await this.findOne(id)
    return {meta:{message:ONE_ORDER}, data:{...data}};
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    const data= await this.ordersService.update(id, updateOrderDto);
    return {meta:{message: ORDER_UPDATED}, data:{...data}};
  }

  @Put('trucks/:id')
  @UseGuards(JwtAuthGuard)
  async updateTrucks(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    const data= await this.ordersService.updateTruck(id, updateOrderDto);
    return {meta:{message:ORDER_UPDATED}, data:{...data}};
  }

  @Put('farms/:id')
  @UseGuards(JwtAuthGuard)
  async updateFarm(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    const data= await this.ordersService.updateFarm(id, updateOrderDto);
    return {meta:{message:ORDER_UPDATED}, data:{...data}};
  }

  @Put('statements/:id')
  @UseGuards(JwtAuthGuard)
  async updateStatement(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    const data= await this.ordersService.updateStatement(id, updateOrderDto);
    return {meta:{message:ORDER_UPDATED}, data:{...data}};
  }

  @Put('type-orders/:id')
  @UseGuards(JwtAuthGuard)
  async updateTypeOrder(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    const data= await this.ordersService.updateTypeOrder(id, updateOrderDto);
    return {meta:{message: ORDER_UPDATED}, data:{...data}};
  }

  @Put('arrive-date/:id')
  @UseGuards(JwtAuthGuard)
  async updateArriveDate(@Param('id', ParseIntPipe) id: number){
    const data= await this.updateArriveDate(id);
    return {meta:{message: ORDER_UPDATED}, data:{...data}};
  }

  @Put('exit-date/:id')
  @UseGuards(JwtAuthGuard)
  async updateGetOutDate(@Param('id', ParseIntPipe) id: number){
    const data= await this.updateGetOutDate(id);
    return {meta:{message: ORDER_UPDATED}, data:{...data}};
  }

  @Put('destination-arrive-date/:id')
  @UseGuards(JwtAuthGuard)
  async updateDestinationArriveDate(@Param('id', ParseIntPipe) id: number){
    const data= await this.updateDestinationArriveDate(id);
    return {meta:{message: ORDER_UPDATED}, data:{...data}};
  }

  @Put('finish-date/:id')
  @UseGuards(JwtAuthGuard)
  async updateFinishDate(@Param('id', ParseIntPipe) id: number){
    const data= await this.updateFinishDate(id);
    return {meta:{message: ORDER_UPDATED}, data:{...data}};
  }

  @Put('bill/:id')
  @UseGuards(JwtAuthGuard)
  async updateBill(@Param('id', ParseIntPipe) id: number){
    const data= await this.updateBill(id);
    return {meta:{message: ORDER_UPDATED}, data:{...data}};
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.ordersService.remove(id);
    return {meta:{message: ORDER_DELETED}};
  }
}
