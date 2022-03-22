/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
    DefaultValuePipe,
    ParseIntPipe,
    BadRequestException,
} from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { AbilityFactory } from 'src/ability/abilities/ability.factory';
import { JwtAuthGuard } from 'src/auth/guards';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { CheckAbilities } from 'src/common/decorators';
import { Action } from 'src/ability/enums/actions.enums';
import { User as UserEntity } from '../users/entities';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Process as ProcessEntity } from './entities';
import { ONE_PROCESS, PROCESS_CREATED, PROCESS_DELETED, PROCESS_UPDATED } from 'src/common/messages';

@Controller('processes')
export class ProcessesController {
    constructor(private readonly processService: ProcessesService, private abilityFactory: AbilityFactory) {}

    @Post()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Create, subject: UserEntity })
    async create(@Body() createProcessDto: CreateProcessDto) {
        const processCreated = await this.processService.create(createProcessDto);
        return { data: { ...processCreated }, meta: { message: PROCESS_CREATED } };
    }

    @Get()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: UserEntity })
    async getAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) _limit = 3
    ): Promise<Pagination<ProcessEntity>> {
        const limit = _limit;
        return this.processService.getAll({
            page,
            limit,
            route: 'http://localhost:8000/processes',
        });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: UserEntity })
    async getOne(@Param('id') id: number) {
        const process = await this.processService.getOne(id);
        return { data: { ...process }, meta: { message: ONE_PROCESS } };
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Update, subject: UserEntity })
    async update(@Param('id') id: number, @Body() editProcessDto: UpdateProcessDto) {
        const data = this.processService.getOne(id);
        if (!data) throw new BadRequestException(`Route with ${id} doesn't exists`);
        const processUpdate = await this.processService.update(id, editProcessDto);
        return { data: { ...processUpdate }, meta: { message: PROCESS_UPDATED } };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Delete, subject: UserEntity })
    async remove(@Param('id') id: number) {
        const data = this.processService.getOne(id);
        if (!data) throw new BadRequestException(`Route with ${id} doesn't exists`);
        await this.processService.remove(id);
        return { meta: { message: PROCESS_DELETED } };
    }
}
