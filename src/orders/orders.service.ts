/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { FarmsService } from 'src/farms/farms.service';
import { OrderStatementsService } from 'src/order-statements/order-statements.service';
import { TrucksService } from 'src/trucks/trucks.service';
import { User } from 'src/users/entities';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private trucksService: TrucksService,
        private farmsService: FarmsService,
        private ordersStatementService: OrderStatementsService
    ) {}

    async getMyOrders(id: string, options: IPaginationOptions):Promise<Pagination<Order>>{
        const queryBuilder= this.orderRepository.createQueryBuilder('orders');
        queryBuilder.where("orders.user = :user", {user:id});
        return paginate(queryBuilder, options);
    }

    async create(createOrderDto: CreateOrderDto, user: User) {
        const firstFarm = await this.farmsService.findByName(createOrderDto.firstFarm);
        const lastFarm = await this.farmsService.findByName(createOrderDto.lastFarm);
        const state = await this.ordersStatementService.getByName('Pedida');
        if (!state ) throw new NotFoundException();
        if(!firstFarm) throw new NotFoundException();
        if(!lastFarm) throw new NotFoundException();
        let orderCreated = new Order();
        orderCreated = Object.assign(orderCreated, createOrderDto);
        orderCreated.requestUser = user;
        orderCreated.firstFarm = firstFarm;
        orderCreated.lastFarm = lastFarm;
        orderCreated.statement = state;
        return await this.orderRepository.save(orderCreated);
    }

    findAll(options: IPaginationOptions): Promise<Pagination<Order>> {
        return paginate(this.orderRepository, options);
    }

    async findAllStartFarm(startFarm: string, options: IPaginationOptions): Promise<Pagination<Order>> {
        const farm = await this.farmsService.findByName(startFarm);
        if(!farm) throw new NotFoundException();
        const queryBuilder=this.orderRepository.createQueryBuilder('orders').where("orders.first_farm = :first_Farm", {first_Farm: farm.idFarm}).andWhere("orders.order_statement != :order_statement", {order_statement:2}).andWhere("orders.order_statement != :order_statement", {order_statement:3});
        return paginate(queryBuilder, options);
    }

    async findAllLastFarm(lastFarm: string, options: IPaginationOptions): Promise<Pagination<Order>>{
        const farm = await this.farmsService.findByName(lastFarm);
        if(!farm) throw new NotFoundException();
        const queryBuilder= this.orderRepository.createQueryBuilder('orders').where("orders.last_farm = :last_Farm", {last_Farm: farm.idFarm}).andWhere("orders.order_statement != :order_statement", {order_statement:2}).andWhere("orders.order_statement != :order_statement", {order_statement:3});
        return paginate(queryBuilder, options);
    }

    async findByStatement(statement: string, options: IPaginationOptions): Promise<Pagination<Order>>{
        const statementFound = await this.ordersStatementService.getByName(statement);
        if(!statementFound) throw new NotFoundException();
        const queryBuilder= this.orderRepository.createQueryBuilder('orders');
        queryBuilder.where("orders.order_statement = :order_statement", {order_statement: statementFound.idOrderStatement});
        return paginate(queryBuilder, options);
    }

    async findOne(id: number) {
        const orderFound = await this.orderRepository.findOne(id);
        if (!orderFound) throw new NotFoundException();
        return orderFound;
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        const orderFound = await this.findOne(id);
        const orderUpdated = Object.assign(orderFound, updateOrderDto);
        return await this.orderRepository.save(orderUpdated);
    }

    async remove(id: number) {
        const orderFound = await this.findOne(id);
        await this.orderRepository.remove(orderFound);
    }

    async updateStatement(id: number, updateOrderDto: UpdateOrderDto) {
        const statementFound = await this.ordersStatementService.getByName(updateOrderDto.state);
        if (!statementFound) throw new NotFoundException();
        const orderFound = await this.findOne(id);
        orderFound.statement = statementFound;
        return await this.orderRepository.save(orderFound);
    }

    async updateTruck(id: number, updateOrderDto: UpdateOrderDto) {
        const truckFound = await this.trucksService.findOne(updateOrderDto.truck);
        if (!truckFound) throw new NotFoundException();
        const orderFound = await this.findOne(id);
        if(truckFound.isExternal) orderFound.isBill = true;
        else orderFound.isBill = false;
        orderFound.truck = truckFound;
        return await this.orderRepository.save(orderFound);
    }

    async updateFarm(id: number, updateOrderDto: UpdateOrderDto) {
        const farmFound = await this.farmsService.findByName(updateOrderDto.lastFarm);
        if (!farmFound) throw new NotFoundException();
        const orderFound = await this.findOne(id);
        orderFound.lastFarm = farmFound;
        return await this.orderRepository.save(orderFound);
    }

    async updateArriveDate(id: number) {
        const order = await this.findOne(id);
        order.arriveDate = new Date(Date.now());
        return await this.orderRepository.save(order);
    }

    async updateGetOutDate(id: number) {
        const order = await this.findOne(id);
        order.exitDate = new Date(Date.now());
        return await this.orderRepository.save(order);
    }

    async updateDestinationArriveDate(id: number) {
        const order = await this.findOne(id);
        order.destinationArriveDate = new Date(Date.now());
        return await this.orderRepository.save(order);
    }

    async updateFinishDate(id: number) {
        const order = await this.findOne(id);
        order.destinationExitDate = new Date(Date.now());
        return await this.orderRepository.save(order);
    }

    async updateBill(id: number) {
        const order = await this.findOne(id);
        order.isBill = true;
        return await this.orderRepository.save(order);
    }
}
