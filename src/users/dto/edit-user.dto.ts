/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "."

export class EditUserDto extends PartialType(CreateUserDto) {}