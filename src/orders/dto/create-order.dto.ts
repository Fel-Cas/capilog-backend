import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    firstFarm: string;

    @IsString()
    lastFarm: string;

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
    @IsDate()
    arriveDate: Date;

    @IsOptional()
    @IsDate()
    exitDate: Date;

    @IsOptional()
    @IsDate()
    destinationArriveDate: Date;

    @IsOptional()
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
