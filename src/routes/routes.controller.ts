import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { AbilityFactory } from 'src/ability/ability.factory';
import { JwtAuthGuard } from 'src/auth/guards';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { CheckAbilities } from 'src/common/decorators';
import { Action } from 'src/ability/enums/actions.enums';
import { User as UserEntity } from '../users/entities';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Route as RouteEntity } from './entities';

@Controller('routes')
export class RoutesController {
    constructor(private readonly routeService: RoutesService, private abilityFactory: AbilityFactory) {}

    @Post()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Create, subject: UserEntity })
    async create(@Body() createRouteDto: CreateRouteDto) {
        const routeCreated = await this.routeService.create(createRouteDto);
        return { data: { ...routeCreated }, meta: { message: 'Route created' } };
    }

    @Get()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: UserEntity })
    async getAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) _limit = 3
    ): Promise<Pagination<RouteEntity>> {
        const limit = _limit;
        return this.routeService.getAll({
            page,
            limit,
            route: 'http://localhost:8000/routes',
        });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: UserEntity })
    async getOne(@Param('id') id: number) {
        const route = await this.routeService.getOne(id);
        return { data: { ...route }, meta: { message: 'One route' } };
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Update, subject: UserEntity })
    async update(@Param('id') id: number, @Body() editRouteDto: UpdateRouteDto) {
        const data = this.routeService.getOne(id);
        if (!data) throw new BadRequestException(`Route with ${id} doesn't exists`);
        const routeUpdate = await this.routeService.update(id, editRouteDto);
        return { data: { ...routeUpdate }, meta: { message: 'Route updated' } };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Delete, subject: UserEntity })
    async remove(@Param('id') id: number) {
        const data = this.routeService.getOne(id);
        if (!data) throw new BadRequestException(`Route with ${id} doesn't exists`);
        await this.routeService.remove(id);
        return { meta: { message: 'Route deleted' } };
    }
}