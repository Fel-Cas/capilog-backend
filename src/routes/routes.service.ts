/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ROUTE_NOT_EXISTS } from 'src/common/messages';
import { FarmsService } from 'src/farms/farms.service';
import { Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from './entities';

@Injectable()
export class RoutesService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,
        private readonly farmService: FarmsService
    ) {}

    async create(createRouteDto: CreateRouteDto) {
        const route = new Route();
        route.name= createRouteDto.name;
        route.observations=createRouteDto.observations;

        return await this.routeRepository.save(route);
    }

    async getAll(option: IPaginationOptions): Promise<Pagination<Route>> {
        return paginate(this.routeRepository, option);
    }

    async getOne(id: number): Promise<Route> {
        const route = await this.routeRepository.findOne(id);
        if (!route) throw new NotFoundException(ROUTE_NOT_EXISTS);
        return route;
    }

    async findByName(name: string) {
        const routeFound = await this.routeRepository.findOne({ name });
        if (!routeFound) throw new NotFoundException(ROUTE_NOT_EXISTS);
        return routeFound;
    }

    async update(id: number, updateRouteDto: UpdateRouteDto) {
        const route = await this.routeRepository.findOne(id);
        if (!route) throw new NotFoundException(ROUTE_NOT_EXISTS);
        const routeEdit = Object.assign(route, updateRouteDto);
        const data = await this.routeRepository.save(routeEdit);
        return data;
    }

    async remove(id: number) {
        const route = await this.routeRepository.findOne(id);
        if (!route) throw new NotFoundException(ROUTE_NOT_EXISTS);
        const data = await this.routeRepository.delete(id);
        return data;
    }
}
