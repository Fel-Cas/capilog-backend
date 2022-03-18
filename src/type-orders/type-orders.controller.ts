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
import { TypeOrdersService } from './type-orders.service';
import { CreateTypeOrderDto } from './dto/create-type-order.dto';
import { UpdateTypeOrderDto } from './dto/update-type-order.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { TYPE_ORDER, TYPE_ORDER_CREATED, TYPE_ORDER_DELETED, TYPE_ORDER_UPDATED } from 'src/common/messages';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { CheckAbilities } from 'src/common/decorators';
import { Action } from 'src/ability/enums/actions.enums';
import { TypeOrder } from './entities';

@Controller('type-orders')
export class TypeOrdersController {
    constructor(private readonly typeOrdersService: TypeOrdersService) {}

    @Post()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Create, subject: TypeOrder })
    async create(@Body() createTypeOrderDto: CreateTypeOrderDto) {
        const data = await this.typeOrdersService.create(createTypeOrderDto);
        return {meta:{message:TYPE_ORDER_CREATED}, data:{...data}};
    }

    @Get()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: TypeOrder })
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
    ) {
        return this.typeOrdersService.findAll({
            page,
            limit,
            route: 'http://localhost:8000/type-orders',
        });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.ReadOne, subject: TypeOrder })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const data = await this.typeOrdersService.findOne(id);
        return {meta:{message: TYPE_ORDER}, data:{...data}};
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Update, subject: TypeOrder })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateTypeOrderDto: UpdateTypeOrderDto) {
        const data = await this.typeOrdersService.update(id, updateTypeOrderDto);
        return {meta:{message:TYPE_ORDER_UPDATED}, data:{...data}};
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Delete, subject: TypeOrder })
    async remove(@Param('id', ParseIntPipe) id: number) {
      await  this.typeOrdersService.remove(id);
      return {meta:{message: TYPE_ORDER_DELETED}}
    }
}
