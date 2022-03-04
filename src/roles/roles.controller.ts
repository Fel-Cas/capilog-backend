/* eslint-disable prettier/prettier */
import { Controller, Get, ParseIntPipe, UseGuards, Query, DefaultValuePipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { CheckAbilities } from 'src/common/decorators';
import { Action } from 'src/ability/enums/actions.enums';
import { Role } from './entities';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Get()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: Role })
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) _limit =3,
    ): Promise<Pagination<Role>> {
        const limit = _limit;
        return this.rolesService.findAll({
        page,
        limit,
        route: 'http://localhost:8000/roles',
        });
    }

}
