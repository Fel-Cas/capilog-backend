import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeOrdersService } from './type-orders.service';
import { CreateTypeOrderDto } from './dto/create-type-order.dto';
import { UpdateTypeOrderDto } from './dto/update-type-order.dto';

@Controller('type-orders')
export class TypeOrdersController {
    constructor(private readonly typeOrdersService: TypeOrdersService) {}

    @Post()
    create(@Body() createTypeOrderDto: CreateTypeOrderDto) {
        return this.typeOrdersService.create(createTypeOrderDto);
    }

    @Get()
    findAll() {
        return this.typeOrdersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.typeOrdersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTypeOrderDto: UpdateTypeOrderDto) {
        return this.typeOrdersService.update(+id, updateTypeOrderDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.typeOrdersService.remove(+id);
    }
}
