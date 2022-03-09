import { IsString } from "class-validator";

export class CreateFarmDto {
    
    @IsString()
    farm: string;

    @IsString()
    location: string;
}
