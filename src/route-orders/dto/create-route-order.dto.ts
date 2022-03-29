import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Route } from 'src/routes/entities';
import { Truck } from 'src/trucks/entities';

export class CreateRouteOrderDto {

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    finishDate: Date;

    @IsString()
    state: string;

    @IsString()
    truck: string;

    @IsOptional()
    @IsBoolean()
    isBill: boolean;

    @IsString()
    route: string;
}
