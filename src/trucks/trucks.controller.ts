/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, Put } from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';

@Controller('trucks')
export class TrucksController {
    constructor(private readonly trucksService: TrucksService) {}

    @Post()
    async create(@Body() createTruckDto: CreateTruckDto) {
      createTruckDto.license=createTruckDto.license.toLocaleUpperCase();
      const data= await this.trucksService.create(createTruckDto);
      return{meta:{message:'Truck created'}, data:{...data}};
    }

    @Get()
    async findAll(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe ) page=1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit=10
    ) {
       return this.trucksService.findAll({
         page,
         limit,
         route:'http://localhost:8000/trucks'
       })
    }

    @Get(':id')
    async findOne(@Param('id') id:string) {
      const data= await this.trucksService.findOne(id);
      return{meta:{message:'one truck'}, data:{...data}};
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTruckDto: UpdateTruckDto) {
        const data = await this.trucksService.update(id, updateTruckDto);
        return {meta:{message:'truck updated'}, data:{...data}};
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
      await this.trucksService.remove(id);
      return {meta:{message:'truck deleted'}};
    }
}
