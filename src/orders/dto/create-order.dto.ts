import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    firstFarm: string;

    @IsString()
    lastFarm: string;

    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    securitySeal: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    arriveDate: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    exitDate: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    destinationArriveDate: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    finishDate: Date;

    @IsString()
    state: string;

    @IsOptional()
    @IsString()
    truck: string;

    @IsString()
    typeOrder: string;

    @IsOptional()
    @IsBoolean()
    isBill: boolean;
}
