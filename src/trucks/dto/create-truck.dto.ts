/* eslint-disable prettier/prettier */
import { IsString, Length } from 'class-validator';

export class CreateTruckDto {
    @IsString()
    @Length(6)
    license: string;

    @IsString()
    driverName: string;

    @IsString()
    dniDriver: string;
}
