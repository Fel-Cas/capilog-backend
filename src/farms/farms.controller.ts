/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    DefaultValuePipe,
    ParseIntPipe,
    Query,
    BadRequestException,
    UseGuards,
    Put,
} from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto';
import { EditFarmDto } from './dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Farm, Farm as FarmEntity } from './entities';
import { AbilityFactory } from '../ability/abilities/ability.factory';
import { JwtAuthGuard } from 'src/auth/guards';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { CheckAbilities } from 'src/common/decorators';
import { Action } from 'src/ability/enums/actions.enums';
import { FARM_CREATED, FARM_DELETED, FARM_UPDATED, ONE_FARM } from 'src/common/messages';

@Controller('farms')
export class FarmsController {
    constructor(private readonly farmService: FarmsService, private abilityFactory: AbilityFactory) {}

    @Post()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Create, subject: Farm })
    async create(@Body() createFarmDto: CreateFarmDto) {
        const farmCreate = await this.farmService.create(createFarmDto);
        return { data: { ...farmCreate }, meta: { message: FARM_CREATED } };
    }

    @Get()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: Farm })
    async getAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) _limit = 3
    ): Promise<Pagination<FarmEntity>> {
        const limit = _limit;
        return this.farmService.getAll({
            page,
            limit,
            route: 'http://localhost:8000/farms',
        });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: Farm })
    async getOne(@Param('id') id: number) {
        const farm = await this.farmService.getOne(id);
        return { data: { ...farm }, meta: { message: ONE_FARM } };
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Update, subject: Farm })
    async update(@Param('id') id: number, @Body() editFarmDto: EditFarmDto) {
        const data = this.farmService.getOne(id);
        if (!data) throw new BadRequestException(`Farm with ${id} doesn't exists`);
        const farmUpdate = await this.farmService.update(id, editFarmDto);
        return { data: { ...farmUpdate }, meta: { message: FARM_UPDATED } };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Delete, subject: Farm })
    async remove(@Param('id') id: number) {
        const data = this.farmService.getOne(id);
        if (!data) throw new BadRequestException(`Farm with ${id} doesn't exists`);
        await this.farmService.remove(id);
        return { meta: { message: FARM_DELETED } };
    }
}
