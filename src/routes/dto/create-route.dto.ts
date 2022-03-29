import { IsArray, IsString } from 'class-validator';
import { Farm } from 'src/farms/entities';

export class CreateRouteDto {
    @IsString()
    name: string;

    @IsString()
    observations: string;

    @IsString({each: true})
    farms: string[];

}
