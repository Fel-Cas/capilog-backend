import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTruckDto } from './create-truck.dto';

export class UpdateTruckDto extends PartialType(OmitType(CreateTruckDto, ['license'] as const)) {}
