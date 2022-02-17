/* eslint-disable prettier/prettier */
import {IsEmail, IsEnum, IsString, MaxLength, MinLength} from 'class-validator';
import { CreateDateColumn } from 'typeorm';
import { EnumToString } from '../../helpers/enumToString';

import { UserRole } from '../enums/user-role.enum';
export class CreateUserDto {
  @IsString()  
  dni: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsEnum(UserRole,{
      message:`role invalido. Opciones válidas para rol son ${EnumToString(UserRole)}`
  })
  // @IsString() //Provisional
  // role: string;
  role: UserRole;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @IsString()
  phone: string;

  @IsString()
  @IsEmail()
  email: string;  
}