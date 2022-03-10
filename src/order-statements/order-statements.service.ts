import { Injectable } from '@nestjs/common';
import { CreateOrderStatementDto } from './dto/create-order-statement.dto';
import { UpdateOrderStatementDto } from './dto/update-order-statement.dto';

@Injectable()
export class OrderStatementsService {
  create(createOrderStatementDto: CreateOrderStatementDto) {
    return 'This action adds a new orderStatement';
  }

  findAll() {
    return `This action returns all orderStatements`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderStatement`;
  }

  update(id: number, updateOrderStatementDto: UpdateOrderStatementDto) {
    return `This action updates a #${id} orderStatement`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderStatement`;
  }
}
