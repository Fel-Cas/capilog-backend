/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class CreateTypeOrderDto {
    @IsString()
    description: string;
}
