/* eslint-disable prettier/prettier */
import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateTruckDto {
    @IsString()
    @Length(6)
    license: string;

    @IsString()
    driverName: string;

    @IsString()
    dniDriver: string;

    @IsBoolean()
    isExternal:boolean;
}
