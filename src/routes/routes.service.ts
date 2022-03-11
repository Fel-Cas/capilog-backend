import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from './entities';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>
) {}

async create(createRouteDto: CreateRouteDto) {
    const route = this.routeRepository.create(createRouteDto);

    return await this.routeRepository.save(route);
}

async getAll(option: IPaginationOptions): Promise<Pagination<Route>> {
    return paginate(this.routeRepository, option);
}

async getOne(id: number): Promise<Route> {
    const route = await this.routeRepository.findOne(id);
    if (!route) throw new NotFoundException(`Route doesn't exists`);
    return route;
}

async findByName(name: string) {
    const routeFound = await this.routeRepository.findOne({ name });
    if (!routeFound) throw new NotFoundException(`Route doesn't exists`);
    return routeFound;
}

async update(id: number, updateRouteDto: UpdateRouteDto) {
    const route = await this.routeRepository.findOne(id);
    if (!route) throw new NotFoundException(`Route doesn't exists`);
    const routeEdit = Object.assign(route, updateRouteDto);
    const data = await this.routeRepository.save(routeEdit);
    return data;
}

async remove(id: number) {
    const route = await this.routeRepository.findOne(id);
    if (!route) throw new NotFoundException(`Route doesn't exists`);
    const data = await this.routeRepository.delete(id);
    return data;
}
}
