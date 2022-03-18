/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {  IsDate, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    firstFarm: string;

    @IsString()
    lastFarm: string;

    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @IsString()
    description: string;

    @IsString()
    state: string;

    @IsString()
    typeOrder: string;

    @IsOptional()
    @IsString()
    truck: string;

    
}
