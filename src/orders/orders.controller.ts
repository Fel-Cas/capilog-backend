/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
    DefaultValuePipe,
    ParseIntPipe,
    Put,
    UseGuards,
    BadRequestException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CheckAbilities, User } from 'src/common/decorators';
import { User as UserEntity} from './../users/entities/user.entity'; 
import { JwtAuthGuard } from 'src/auth/guards';
import { ONE_ORDER, ORDER_CREATED, ORDER_DELETED, ORDER_UPDATED } from 'src/common/messages';
import { Action } from 'src/ability/enums/actions.enums';
import { Order } from './entities';
import { OrderGuard } from 'src/ability/guards/order.abilities.guard';
import { Farm } from 'src/farms/entities';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get('my-orders')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Read, subject: Order })
    async findMyOrders(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
        @User() user: UserEntity,
    ) {
        return this.ordersService.getMyOrders(user.dni,{
            page,
            limit,
            route: 'http://localhost:8000/orders/my-orders',
        });
    }

    @Get('today-orders')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Read, subject: Order })
    async findTodayOrders(          
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10, ) {
        return this.ordersService.findTodayOrders({
            page,
            limit,
            route: 'http://localhost:8000/orders/today-orders',
        });
    }

    @Get('pastdays-orders')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Read, subject: Order })
    async findPastDaysOrders(          
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10, ) {
        return this.ordersService.findPastDaysOrders({
            page,
            limit,
            route: 'http://localhost:8000/orders/pastdays-orders',
        });
    }

    @Post()
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Create, subject: Order })
    async create(@Body() createOrderDto: CreateOrderDto, @User() user) {
        const data = await this.ordersService.create(createOrderDto, user);
        return { meta: { message: ORDER_CREATED }, data: { ...data } };
    }

    @Get()
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Read, subject: Order })
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
    ) {
        return this.ordersService.findAll({
            page,
            limit,
            route: 'http://localhost:8000/orders',
        });
    }

    @Get('start-farm')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Read, subject: Order })
    async findAllStartFarm(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
        @Query('farm') farm:string
    ) {
        if(typeof farm !== 'string') throw new BadRequestException('Debes incluir el nombre de la finca');
        const data=await this.ordersService.findAllStartFarm(farm.toLocaleUpperCase(),{
            page,
            limit,
            route: 'http://localhost:8000/orders/start-farm',
        });
        return{meta:{message:'All orders'}, data};
    }

    @Get('last-farm')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Read, subject: Order })
    async findAllLastFarm(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
        @Query('farm') farm:string
    ) {
        if(typeof farm !== 'string') throw new BadRequestException('Debes incluir el nombre de la finca');
        const data = await this.ordersService.findAllLastFarm(farm.toLocaleUpperCase(),{
            page,
            limit,
            route: 'http://localhost:8000/orders/last-farm',
        });
        return{meta:{message:'All orders'}, data}
    }

    @Get('statement')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Read, subject: Order })
    async findByStatement(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
        @Query('statement') statement:string
    ) {
        if(typeof statement !== 'string') throw new BadRequestException('Debes incluir el nombre del estado');
        const data= await this.ordersService.findByStatement(statement.toLocaleUpperCase(),{
            page,
            limit,
            route: 'http://localhost:8000/orders/statement',
        });
        return{meta:{message:'All orders'}, data}
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.ReadOne, subject: Order })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const data = await this.ordersService.findOne(id);
        return { meta: { message: ONE_ORDER }, data: { ...data } };
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Update, subject: Order })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
        const data = await this.ordersService.update(id, updateOrderDto);
        return { meta: { message: ORDER_UPDATED }, data: { ...data } };
    }

    @Put('trucks/:id')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Update, subject: Order })
    async updateTrucks(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
        const data = await this.ordersService.updateTruck(id, updateOrderDto);
        return { meta: { message: ORDER_UPDATED }, data: { ...data } };
    }

    @Put('farms/:id')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Update, subject: Order })
    async updateFarm(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
        const data = await this.ordersService.updateFarm(id, updateOrderDto);
        return { meta: { message: ORDER_UPDATED }, data: { ...data } };
    }

    @Put('statements/:id')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Update, subject: Order })
    async updateStatement(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
        const data = await this.ordersService.updateStatement(id, updateOrderDto);
        return { meta: { message: ORDER_UPDATED }, data: { ...data } };
    }

    @Put('arrive-date/:id')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Update, subject: Order })
    async updateArriveDate(@Param('id', ParseIntPipe) id: number) {
        const data = await this.ordersService.updateArriveDate(id);
        return { meta: { message: ORDER_UPDATED }, data: { ...data } };
    }

    @Put('exit-date/:id')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Update, subject: Order })
    async updateGetOutDate(@Param('id', ParseIntPipe) id: number) {
        const data = await this.ordersService.updateGetOutDate(id);
        return { meta: { message: ORDER_UPDATED }, data: { ...data } };
    }

    @Put('destination-arrive-date/:id')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Update, subject: Order })
    async updateDestinationArriveDate(@Param('id', ParseIntPipe) id: number) {
        const data = await this.ordersService.updateDestinationArriveDate(id);
        return { meta: { message: ORDER_UPDATED }, data: { ...data } };
    }

    @Put('finish-date/:id')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Update, subject: Order })
    async updateFinishDate(@Param('id', ParseIntPipe) id: number) {
        const data = await this.ordersService.updateFinishDate(id);
        return { meta: { message: ORDER_UPDATED }, data: { ...data } };
    }

    @Put('bill/:id')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Update, subject: Order })
    async updateBill(@Param('id', ParseIntPipe) id: number) {
        const data = await this.ordersService.updateBill(id);
        return { meta: { message: ORDER_UPDATED }, data: { ...data } };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Delete, subject: Order })
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.ordersService.remove(id);
        return { meta: { message: ORDER_DELETED } };
    }
}
