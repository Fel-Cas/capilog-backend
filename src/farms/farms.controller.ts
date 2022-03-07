import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe, ParseIntPipe, Query, BadRequestException, UseGuards } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto';
import { EditFarmDto } from './dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Farm as FarmEntity} from './entities'
import { AbilityFactory } from '../ability/ability.factory';
import { JwtAuthGuard } from 'src/auth/guards';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { CheckAbilities } from 'src/common/decorators';
import { Action } from 'src/ability/enums/actions.enums';
import { User as UserEntity } from '../users/entities';

@Controller('farms')
export class FarmsController {
  constructor(    
    private readonly farmService: FarmsService,
    private abilityFactory: AbilityFactory
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: UserEntity })
  async create(@Body() createFarmDto: CreateFarmDto) {
    const farmCreate = await this.farmService.create(createFarmDto);
    return { data: {...farmCreate}, meta: { message: 'Farm created' }};
  }

  @Get()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.ReadFarm, subject: UserEntity })
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) _limit = 3, 
  ): Promise<Pagination<FarmEntity>>
  {
    const limit = _limit;
    return this.farmService.getAll({
      page,
      limit,
      route: 'http://localhost:8000/farms'
    });
    
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.ReadFarm, subject: UserEntity })
  async getOne(@Param('id') id: number) {
    const farm = await this.farmService.getOne(id);
    return { data: { ...farm }, meta: { message: 'One farm' } };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.UpdateFarm, subject: UserEntity })
  async update(@Param('id') id: number, @Body() editFarmDto: EditFarmDto) {
    const data = this.farmService.getOne(id);
    if(!data) throw new BadRequestException(`Farm with ${id} doesn't exists`);
    const farmUpdate = await this.farmService.update(id, editFarmDto);
    return { data: { ...farmUpdate }, meta:{ message: 'Farm updated' } };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.DeleteFarm, subject: UserEntity })
  async remove(@Param('id') id: number) {
    const data = this.farmService.getOne(id);
    if(!data) throw new BadRequestException(`Farm with ${id} doesn't exists`);
    await this.farmService.remove(id);
    return { meta: { message: 'Farm deleted' } };
  }
}
