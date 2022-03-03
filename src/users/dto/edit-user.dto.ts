/* eslint-disable prettier/prettier */
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from '.';

export class EditUserDto extends PartialType(OmitType(CreateUserDto, ['dni'] as const)) {}
