/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
    DefaultValuePipe,
    ParseIntPipe,
    Put,
    UseGuards,
} from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { ONE_TRUCK, TRUCK_CREATED, TRUCK_DELETED, TRUCK_UPDATED } from 'src/common/messages';
import { TruckGuard } from 'src/ability/guards/truck.abilities.guard';
import { CheckAbilities } from 'src/common/decorators';
import { Action } from 'src/ability/enums/actions.enums';
import { Truck } from './entities';

@Controller('trucks')
export class TrucksController {
    constructor(private readonly trucksService: TrucksService) {}

    @Post()
    @UseGuards(JwtAuthGuard, TruckGuard)
    @CheckAbilities({ action: Action.Create, subject: Truck })
    async create(@Body() createTruckDto: CreateTruckDto) {
        createTruckDto.license = createTruckDto.license.toLocaleUpperCase();
        const data = await this.trucksService.create(createTruckDto);
        return { meta: { message: TRUCK_CREATED }, data: { ...data } };
    }

    @Get()
    @UseGuards(JwtAuthGuard, TruckGuard)
    @CheckAbilities({ action: Action.Read, subject: Truck })
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
    ) {
        return this.trucksService.findAll({
            page,
            limit,
            route: 'http://localhost:8000/trucks',
        });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, TruckGuard)
    @CheckAbilities({ action: Action.ReadOne, subject: Truck })
    async findOne(@Param('id') id: string) {
        const data = await this.trucksService.findOne(id);
        return { meta: { message: ONE_TRUCK }, data: { ...data } };
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, TruckGuard)
    @CheckAbilities({ action: Action.Update, subject: Truck })
    async update(@Param('id') id: string, @Body() updateTruckDto: UpdateTruckDto) {
        const data = await this.trucksService.update(id, updateTruckDto);
        return { meta: { message: TRUCK_UPDATED }, data: { ...data } };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, TruckGuard)
    @CheckAbilities({ action: Action.Delete, subject: Truck })
    async remove(@Param('id') id: string) {
        await this.trucksService.remove(id);
        return { meta: { message: TRUCK_DELETED } };
    }
}
