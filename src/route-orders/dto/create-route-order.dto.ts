import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { Route } from 'src/routes/entities';
import { Truck } from 'src/trucks/entities';

export class CreateRouteOrderDto {
    @IsString()
    route: Route;

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
    truck: Truck;

    @IsOptional()
    @IsBoolean()
    isBill: boolean;
}
