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
import { JwtAuthGuard } from 'src/auth/guards';
import { ONE_ORDER, ORDER_CREATED, ORDER_DELETED, ORDER_UPDATED } from 'src/common/messages';
import { Action } from 'src/ability/enums/actions.enums';
import { Order } from './entities';
import { OrderGuard } from 'src/ability/guards/order.abilities.guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

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

    @Get('start-farm/:farm')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Read, subject: Order })
    async findAllStartFarm(
        @Param('farm') farm: string
    ) {
        if(typeof farm !== 'string') throw new BadRequestException('Debes incluir el nombre de la finca');
        const data=await this.ordersService.findAllStartFarm(farm.toLocaleUpperCase());
        return{meta:{message:'All orders'}, data};
    }

    @Get('last-farm/:farm')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Read, subject: Order })
    async findAllLastFarm(
        @Param('farm') farm: string
    ) {
        if(typeof farm !== 'string') throw new BadRequestException('Debes incluir el nombre de la finca');
        const data = await this.ordersService.findAllLastFarm(farm.toLocaleUpperCase());
        return{meta:{message:'All orders'}, data}
    }

    @Get('statement/:statement')
    @UseGuards(JwtAuthGuard, OrderGuard)
    @CheckAbilities({ action: Action.Read, subject: Order })
    async findByStatement(
        @Param('statement') statement: string
    ) {
        if(typeof statement !== 'string') throw new BadRequestException('Debes incluir el nombre del estado');
        const data= await this.ordersService.findByStatement(statement.toLocaleUpperCase());
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
