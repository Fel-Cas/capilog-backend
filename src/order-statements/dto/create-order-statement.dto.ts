import { IsString } from 'class-validator';

export class CreateOrderStatementDto {
    @IsString()
    description: string;
}
