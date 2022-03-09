import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmDto } from './create-farm.dto';

export class EditFarmDto extends PartialType(CreateFarmDto) {}
