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
} from '@nestjs/common';
import { TypeOrdersService } from './type-orders.service';
import { CreateTypeOrderDto } from './dto/create-type-order.dto';
import { UpdateTypeOrderDto } from './dto/update-type-order.dto';

@Controller('type-orders')
export class TypeOrdersController {
    constructor(private readonly typeOrdersService: TypeOrdersService) {}

    @Post()
    async create(@Body() createTypeOrderDto: CreateTypeOrderDto) {
        const data = await this.typeOrdersService.create(createTypeOrderDto);
        return {meta:{message:'type order created'}, data:{...data}};
    }

    @Get()
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
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const data = await this.typeOrdersService.findOne(id);
        return {meta:{message:'one type order'}, data:{...data}};
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateTypeOrderDto: UpdateTypeOrderDto) {
        const data = await this.typeOrdersService.update(id, updateTypeOrderDto);
        return {meta:{message:'type order updated'}, data:{...data}};
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      await  this.typeOrdersService.remove(id);
      return {meta:{message:'type order deleted'}}
    }
}
