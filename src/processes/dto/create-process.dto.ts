import { IsNumber, IsString } from 'class-validator';
import { Farm } from 'src/farms/entities';
import { User } from 'src/users/entities';

export class CreateProcessDto {
    @IsString()
    name: string;
}
