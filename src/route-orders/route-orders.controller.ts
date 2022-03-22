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
import { RouteOrdersService } from './route-orders.service';
import { CreateRouteOrderDto } from './dto/create-route-order.dto';
import { UpdateRouteOrderDto } from './dto/update-route-order.dto';
import { AbilityFactory } from 'src/ability/abilities/ability.factory';
import { JwtAuthGuard } from 'src/auth/guards';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { CheckAbilities } from 'src/common/decorators';
import { Action } from 'src/ability/enums/actions.enums';
import { Pagination } from 'nestjs-typeorm-paginate';
import { RouteOrder as RouteOrderEntity } from './entities';
import { ONE_ROUTE_ORDER, ROUTE_ORDER_CREATED, ROUTE_ORDER_DELETED, ROUTE_ORDER_UPDATED } from 'src/common/messages';
@Controller('route-orders')
export class RouteOrdersController {
    constructor(private readonly routeOrderService: RouteOrdersService, private abilityFactory: AbilityFactory) {}

    @Post()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Create, subject: RouteOrderEntity })
    async create(@Body() createRouteOrderDto: CreateRouteOrderDto) {
        const routeOrderCreated = await this.routeOrderService.create(createRouteOrderDto);
        return { data: { ...routeOrderCreated }, meta: { message: ROUTE_ORDER_CREATED } };
    }

    @Get()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: RouteOrderEntity })
    async getAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) _limit = 3
    ): Promise<Pagination<RouteOrderEntity>> {
        const limit = _limit;
        return this.routeOrderService.getAll({
            page,
            limit,
            route: 'http://localhost:8000/route-orders',
        });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: RouteOrderEntity })
    async getOne(@Param('id') id: number) {
        const routeOrder = await this.routeOrderService.getOne(id);
        return { data: { ...routeOrder }, meta: { message: ONE_ROUTE_ORDER } };
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Update, subject: RouteOrderEntity })
    async update(@Param('id') id: number, @Body() editRouteOrderDto: UpdateRouteOrderDto) {
        const data = this.routeOrderService.getOne(id);
        if (!data) throw new BadRequestException(`Route Order with ${id} doesn't exists`);
        const routeOrderUpdate = await this.routeOrderService.update(id, editRouteOrderDto);
        return { data: { ...routeOrderUpdate }, meta: { message: ROUTE_ORDER_UPDATED } };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Delete, subject: RouteOrderEntity })
    async remove(@Param('id') id: number) {
        const data = this.routeOrderService.getOne(id);
        if (!data) throw new BadRequestException(`Route Order with ${id} doesn't exists`);
        await this.routeOrderService.remove(id);
        return { meta: { message: ROUTE_ORDER_DELETED } };
    }
}
