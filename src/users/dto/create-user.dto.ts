/* eslint-disable prettier/prettier */
import {IsEmail, IsEnum, IsString} from 'class-validator';
import { EnumToString } from 'src/helpers/enumToString';
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
  role: UserRole;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  @IsEmail()
  email: string;
}