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
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { AbilityFactory } from 'src/ability/abilities/ability.factory';
import { JwtAuthGuard } from 'src/auth/guards';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { CheckAbilities } from 'src/common/decorators';
import { Action } from 'src/ability/enums/actions.enums';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Route as RouteEntity } from './entities';
import { ONE_ROUTE, ROUTE_CREATED, ROUTE_DELETED, ROUTE_UPDATED } from 'src/common/messages';

@Controller('routes')
export class RoutesController {
    constructor(private readonly routeService: RoutesService, private abilityFactory: AbilityFactory) {}

    @Post()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Create, subject: RouteEntity })
    async create(@Body() createRouteDto: CreateRouteDto) {
        const routeCreated = await this.routeService.create(createRouteDto);
        return { data: { ...routeCreated }, meta: { message: ROUTE_CREATED } };
    }

    @Get()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: RouteEntity })
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
    @CheckAbilities({ action: Action.Read, subject: RouteEntity })
    async getOne(@Param('id') id: number) {
        const route = await this.routeService.getOne(id);
        return { data: { ...route }, meta: { message: ONE_ROUTE } };
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Update, subject: RouteEntity })
    async update(@Param('id') id: number, @Body() editRouteDto: UpdateRouteDto) {
        const data = this.routeService.getOne(id);
        if (!data) throw new BadRequestException(`Route with ${id} doesn't exists`);
        const routeUpdate = await this.routeService.update(id, editRouteDto);
        return { data: { ...routeUpdate }, meta: { message: ROUTE_UPDATED } };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Delete, subject: RouteEntity })
    async remove(@Param('id') id: number) {
        const data = this.routeService.getOne(id);
        if (!data) throw new BadRequestException(`Route with ${id} doesn't exists`);
        await this.routeService.remove(id);
        return { meta: { message: ROUTE_DELETED } };
    }
}
