import { IsString } from 'class-validator';

export class CreateRouteDto {
    @IsString()
    name: string;

    @IsString()
    observations: string;
}
