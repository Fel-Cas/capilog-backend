/* eslint-disable prettier/prettier */
import { ForbiddenError } from '@casl/ability';
import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AbilityFactory } from 'src/ability/ability.factory';
import { Action } from 'src/ability/enums/actions.enums';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { JwtAuthGuard } from 'src/auth/guards';
import { CheckAbilities, User } from 'src/common/decorators';
import { CreateUserDto, EditUserDto } from './dto';
import { User as UserEntity } from './entities';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService, private abilityFactory: AbilityFactory) {}
    @Get()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: UserEntity })
    async getAll() {
        const users = await this.userService.getAll();
        return { meta: [{ message: 'All users' }], data: [{ type: 'User', users }] };
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getOne(@Param('id') id: string, @User() user: UserEntity) {
        const ability = this.abilityFactory.defineAbility(user);
        try {
            const data = await this.userService.getOne(id);
            ForbiddenError.from(ability).throwUnlessCan(Action.ReadOne, data);
            return { meta: [{ message: 'One user' }], data: [{ type: 'User', ...data }] };
        } catch (error) {
            if (error instanceof ForbiddenError) throw new ForbiddenException(error.message);
        }
    }
    @Post()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Create, subject: UserEntity })
    async create(@Body() content: CreateUserDto) {
        const userCreated = await this.userService.create(content);
        return { meta: [{ message: 'User created' }], data: [{ ...userCreated }] };
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() content: EditUserDto, @User() user: UserEntity) {
        const ability = this.abilityFactory.defineAbility(user);
        try {
            const data = await this.userService.getOne(id);
            ForbiddenError.from(ability).throwUnlessCan(Action.Update, data);
            const userUpdated = await this.userService.update(id, content);
            return { meta: [{ message: 'User updated' }], data: [{ ...userUpdated }] };
        } catch (error) {
            if (error instanceof ForbiddenError) throw new ForbiddenException(error.message);
        }
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Delete, subject: UserEntity })
    async delete(@Param('id') id: string) {
        await this.userService.delete(id);
        return { meta: [{ message: 'User deleted' }] };
    }
    @Put('roles/:id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.UpdateRole, subject: UserEntity })
    async updateRole(@Param('id') id: string, @Body() content: EditUserDto) {
        const userRoleUpdated = await this.userService.updateRole(id, content);
        delete userRoleUpdated.password;
        return { meta: [{ message: 'User updated' }], data: [{ ...userRoleUpdated }] };
    }
}
