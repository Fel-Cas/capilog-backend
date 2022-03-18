/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ROUTE_ORDER_NOT_EXISTS } from 'src/common/messages';
import { Repository } from 'typeorm';
import { CreateRouteOrderDto } from './dto/create-route-order.dto';
import { UpdateRouteOrderDto } from './dto/update-route-order.dto';
import { RouteOrder } from './entities';

@Injectable()
export class RouteOrdersService {
    constructor(
        @InjectRepository(RouteOrder)
        private readonly routeOrderRepository: Repository<RouteOrder>
    ) {}

    async create(createRouteOrderDto: CreateRouteOrderDto) {
        const routeOrder = this.routeOrderRepository.create(createRouteOrderDto);

        return await this.routeOrderRepository.save(routeOrder);
    }

    async getAll(option: IPaginationOptions): Promise<Pagination<RouteOrder>> {
        return paginate(this.routeOrderRepository, option);
    }

    async getOne(id: number): Promise<RouteOrder> {
        const routeOrder = await this.routeOrderRepository.findOne(id);
        if (!routeOrder) throw new NotFoundException(ROUTE_ORDER_NOT_EXISTS);
        return routeOrder;
    }

    async update(id: number, updateRouteOrderDto: UpdateRouteOrderDto) {
        const routeOrder = await this.routeOrderRepository.findOne(id);
        if (!routeOrder) throw new NotFoundException(ROUTE_ORDER_NOT_EXISTS);
        const routeOrderEdit = Object.assign(routeOrder, updateRouteOrderDto);
        const data = await this.routeOrderRepository.save(routeOrderEdit);
        return data;
    }

    async remove(id: number) {
        const routeOrder = await this.routeOrderRepository.findOne(id);
        if (!routeOrder) throw new NotFoundException(ROUTE_ORDER_NOT_EXISTS);
        const data = await this.routeOrderRepository.delete(id);
        return data;
    }
}
