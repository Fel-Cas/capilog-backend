/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { TYPE_ORDER_NOT_EXISTS } from 'src/common/messages';
import { Repository } from 'typeorm';
import { CreateTypeOrderDto } from './dto/create-type-order.dto';
import { UpdateTypeOrderDto } from './dto/update-type-order.dto';
import { TypeOrder } from './entities';

@Injectable()
export class TypeOrdersService {
  constructor(
    @InjectRepository(TypeOrder)
    private readonly typeOrderRepository: Repository<TypeOrder>
  ){}
  async create(createTypeOrderDto: CreateTypeOrderDto) {
    const typeOrderFound = await this.findByName(createTypeOrderDto.description);
    if(typeOrderFound) throw new BadRequestException();
    const typeOrderCreated = this.typeOrderRepository.create(createTypeOrderDto);
    return await this.typeOrderRepository.save(typeOrderCreated);
  }

  findAll(options: IPaginationOptions): Promise<Pagination<TypeOrder>> {
    return paginate(this.typeOrderRepository, options);
  }

  async findOne(id: number) {
   const typeOrderFound = await this.typeOrderRepository.findOne(id);
   if(!typeOrderFound) throw new NotFoundException(TYPE_ORDER_NOT_EXISTS);
   return typeOrderFound;
  }

  async update(id: number, updateTypeOrderDto: UpdateTypeOrderDto) {
    const typeOrderFound= await this.findOne(id);
    const typeOrderUpdated= Object.assign(typeOrderFound, updateTypeOrderDto);
    return await this.typeOrderRepository.save(typeOrderUpdated);
  }

  async remove(id: number) {
    const typeOrderFound= await this.findOne(id);
    await this.typeOrderRepository.remove(typeOrderFound);
  }

  async findByName(typeOrder: string){
    return await this.typeOrderRepository.findOne({where:{description:typeOrder}});
  }
}
