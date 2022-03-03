/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { CheckAbilities } from 'src/common/decorators';
import { Action } from 'src/ability/enums/actions.enums';
import { Role } from './entities';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Create, subject: Role })
    async create(@Body() createRoleDto: CreateRoleDto) {
        const roleCreated = await this.rolesService.create(createRoleDto);
        return { meta: [{ message: 'Role created' }], data: [{ roleCreated }] };
    }

    @Get()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: Role })
    async findAll() {
        const role = await this.rolesService.findAll();
        return { meta: [{ message: 'All roles' }], data: [{ role }] };
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.ReadOne, subject: Role })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const role = await this.rolesService.findOne(+id);
        return { meta: [{ message: 'One role' }], data: [{ ...role }] };
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Update, subject: Role })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
        const roleUpdated = await this.rolesService.update(+id, updateRoleDto);
        return { meta: [{ message: 'Role updated' }], data: [{ ...roleUpdated }] };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Delete, subject: Role })
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.rolesService.delete(+id);
        return { meta: [{ message: 'Role deleted' }] };
    }
}
