/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { TRUCK_NOT_EXISTS } from 'src/common/messages';
import { Repository } from 'typeorm';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Truck } from './entities';

@Injectable()
export class TrucksService {
    constructor(
        @InjectRepository(Truck)
        private readonly truckRepository: Repository<Truck>
    ) {}
    async create(createTruckDto: CreateTruckDto) {
        const truckFound = await this.truckRepository.findOne(createTruckDto.license);
        if (truckFound) throw new BadRequestException();
        const truckCreated = this.truckRepository.create(createTruckDto);
        return await this.truckRepository.save(truckCreated);
    }

    findAll(options: IPaginationOptions): Promise<Pagination<Truck>> {
        return paginate(this.truckRepository, options);
    }

    async findOne(license: string) {
        const truckFound = await this.truckRepository.findOne(license);
        if (!truckFound) throw new NotFoundException(TRUCK_NOT_EXISTS);
        return truckFound;
    }

    async update(license: string, updateTruckDto: UpdateTruckDto) {
        const truckFound = await this.findOne(license);
        const truckUpdated = Object.assign(truckFound, updateTruckDto);
        return await this.truckRepository.save(truckUpdated);
    }

    async remove(license: string) {
        const truckFound = await this.findOne(license);
        await this.truckRepository.remove(truckFound);
    }
}
