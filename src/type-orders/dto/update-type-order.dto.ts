import { PartialType } from '@nestjs/swagger';
import { CreateTypeOrderDto } from './create-type-order.dto';

export class UpdateTypeOrderDto extends PartialType(CreateTypeOrderDto) {}
