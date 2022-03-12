/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { FarmsService } from 'src/farms/farms.service';
import { OrderStatementsService } from 'src/order-statements/order-statements.service';
import { TrucksService } from 'src/trucks/trucks.service';
import { TypeOrdersService } from 'src/type-orders/type-orders.service';
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
    private typeOrdersService: TypeOrdersService,
    private ordersStatementService: OrderStatementsService
  ){}

  async create(createOrderDto: CreateOrderDto, user: User) {
    const firstFarm= await this.farmsService.findByName(createOrderDto.firstFarm);
    const lastFarm= await this.farmsService.findByName(createOrderDto.lastFarm);
    const state= await this.ordersStatementService.getByName(createOrderDto.state);
    const typeOrder= await this.typeOrdersService.findByName(createOrderDto.typeOrder);
    if (!state || !typeOrder) throw new NotFoundException();
    let orderCreated = new Order();
    orderCreated= Object.assign(orderCreated, createOrderDto);
    orderCreated.requestUser= user;
    orderCreated.firstFarm= firstFarm;
    orderCreated.lastFarm= lastFarm;
    orderCreated.statement= state;
    orderCreated.typeOrder= typeOrder;
    return await this.orderRepository.save(orderCreated);
  }

  findAll(options: IPaginationOptions): Promise<Pagination<Order>> {
    return paginate(this.orderRepository, options);
  }

  async findOne(id: number) {
    const orderFound = await this.orderRepository.findOne(id);
    if(!orderFound) throw new NotFoundException();
    return orderFound;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
   const orderFound = await this.findOne(id)
   const orderUpdated= Object.assign(orderFound, updateOrderDto);
   return await this.orderRepository.save(orderUpdated);
  }

  async remove(id: number) {
    const orderFound = await  this.findOne(id);
    await this.orderRepository.remove(orderFound);
  }

  async updateStatement(id: number, updateOrderDto: UpdateOrderDto){
    const statementFound= await this.ordersStatementService.getByName(updateOrderDto.state);
    if(!statementFound) throw new NotFoundException();
    const orderFound = await this.findOne(id);
    orderFound.statement=statementFound;
    return await this.orderRepository.save(orderFound);
  }

  async updateTruck(id: number, updateOrderDto: UpdateOrderDto){
    const truckFound= await this.trucksService.findOne(updateOrderDto.truck);
    if(!truckFound) throw new NotFoundException();
    const orderFound = await this.findOne(id);
    orderFound.truck= truckFound;
    return await this.orderRepository.save(orderFound);
  }

  async updateFarm(id: number, updateOrderDto: UpdateOrderDto){
    const farmFound = await this.farmsService.findByName(updateOrderDto.lastFarm);
    if(!farmFound) throw new NotFoundException();
    const orderFound = await this.findOne(id);
    orderFound.lastFarm= farmFound;
    return await this.orderRepository.save(orderFound);
  }

  async updateTypeOrder(id: number, updateOrderDto: UpdateOrderDto){
    const typeOrderFound  = await this.typeOrdersService.findByName(updateOrderDto.typeOrder);
    if(!typeOrderFound) throw new NotFoundException();
    const orderFound = await this.findOne(id);
    orderFound.typeOrder=typeOrderFound;
    return await this.orderRepository.save(orderFound);
  }
}
