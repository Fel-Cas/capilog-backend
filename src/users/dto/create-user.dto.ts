/* eslint-disable prettier/prettier */
import {IsEmail, IsEnum, IsString, MaxLength, MinLength} from 'class-validator';
import { EnumToString } from '../../common/helpers/enumToString';
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
  @IsString() 
  role: string;
  
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