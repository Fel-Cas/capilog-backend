/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { CreateFarmDto, EditFarmDto } from './dto';
import { Farm } from './entities';

@Injectable()
export class FarmsService {

  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>
  ) {}

  async create(createFarmDto: CreateFarmDto) {
    const farm = this.farmRepository.create(createFarmDto);
    
    return await this.farmRepository.save(farm);
  }

  async getAll(option: IPaginationOptions):Promise<Pagination<Farm>> {
    return paginate(this.farmRepository, option);
  }

  async getOne(id: number): Promise<Farm> {
    const user = await this.farmRepository.findOne(id);
    if(!user) throw new NotFoundException(`Farm doesn't exists`);
    return user;
  }

  async findByName(farm: string) {
    const farmFound = await this.farmRepository.findOne({ where: {farm}});
    return farmFound;
  }

  async update(id: number, editFarmDto: EditFarmDto) {
    const farm = await this.farmRepository.findOne(id);
    if(!farm) throw new NotFoundException(`Farm doesn't exists`)
    const farmEdit = Object.assign(farm, editFarmDto);
    const data = await this.farmRepository.save(farmEdit)
    return data;
  }

  async remove(id: number) {
    const farm = await this.farmRepository.findOne(id);
    if(!farm) throw new NotFoundException(`farm doesn't exists`);
    const data = await this.farmRepository.delete(id)
    return data;
  }
}
