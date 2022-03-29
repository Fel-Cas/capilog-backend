import { IsArray, IsString } from 'class-validator';
import { Route } from 'src/routes/entities';

export class CreateFarmDto {
    @IsString()
    farm: string;

    @IsString()
    location: string;
}
