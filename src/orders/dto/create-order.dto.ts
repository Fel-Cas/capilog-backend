/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

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

    @IsOptional()
    @IsString()
    state: string;


    @IsOptional()
    @IsString()
    truck: string;
}
