/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateOrderStatementDto } from './dto/create-order-statement.dto';
import { UpdateOrderStatementDto } from './dto/update-order-statement.dto';
import { OrderStatement } from './entities';

@Injectable()
export class OrderStatementsService {
    constructor(
        @InjectRepository(OrderStatement)
        private readonly orderStatementRepository: Repository<OrderStatement>
    ) {}
    async create(createOrderStatementDto: CreateOrderStatementDto) {
        const orderStatementFound = await this.getByName(createOrderStatementDto.description);
        if (orderStatementFound) throw new BadRequestException();
        const orderStatementCreated = this.orderStatementRepository.create(createOrderStatementDto);
        return await this.orderStatementRepository.save(orderStatementCreated);
    }

    async findAll(option: IPaginationOptions): Promise<Pagination<OrderStatement>> {
        return paginate(this.orderStatementRepository, option);
    }

    async findOne(id: number) {
        const orderStatementFound= await this.orderStatementRepository.findOne(id);
        if(!orderStatementFound) throw new NotFoundException();
        return orderStatementFound;
    }

    async update(id: number, updateOrderStatementDto: UpdateOrderStatementDto) {
       const orderStatementFound = await this.findOne(id);
       const orderStatementUpdated= Object.assign(orderStatementFound, updateOrderStatementDto);
       return await this.orderStatementRepository.save(orderStatementUpdated);
    }

    async remove(id: number) {
      const orderStatementFound= await this.findOne(id);
      await this.orderStatementRepository.remove(orderStatementFound);  
    }

    async getByName(orderStatement: string) {
        const orderFound = await this.orderStatementRepository.findOne({ where: { description: orderStatement } });
        return orderFound;
    }
}
