import { Injectable } from '@nestjs/common';
import { CreateTypeOrderDto } from './dto/create-type-order.dto';
import { UpdateTypeOrderDto } from './dto/update-type-order.dto';

@Injectable()
export class TypeOrdersService {
  create(createTypeOrderDto: CreateTypeOrderDto) {
    return 'This action adds a new typeOrder';
  }

  findAll() {
    return `This action returns all typeOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeOrder`;
  }

  update(id: number, updateTypeOrderDto: UpdateTypeOrderDto) {
    return `This action updates a #${id} typeOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeOrder`;
  }
}
