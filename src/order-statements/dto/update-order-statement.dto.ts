import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderStatementDto } from './create-order-statement.dto';

export class UpdateOrderStatementDto extends PartialType(CreateOrderStatementDto) {}
