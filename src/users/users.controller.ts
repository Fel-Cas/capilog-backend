/* eslint-disable prettier/prettier */
import { ForbiddenError } from '@casl/ability';
import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    ForbiddenException,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AbilityFactory } from 'src/ability/ability.factory';
import { Action } from 'src/ability/enums/actions.enums';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { JwtAuthGuard } from 'src/auth/guards';
import { CheckAbilities, User } from 'src/common/decorators';
import { ONE_USER, USER_CREATED, USER_DELETED, USER_UPDATED } from 'src/common/errors';
import { CreateUserDto, EditUserDto } from './dto';
import { User as UserEntity } from './entities';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService, private abilityFactory: AbilityFactory) {}
    @Get()
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Read, subject: UserEntity })
    async getAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) _limit = 3
    ): Promise<Pagination<UserEntity>> {
        const limit = _limit;
        return this.userService.getAll({
            page,
            limit,
            route: 'http://localhost:8000/users',
        });
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getOne(@Param('id') id: string, @User() user: UserEntity) {
        const ability = this.abilityFactory.defineAbility(user);
        try {
            const data = await this.userService.getOne(id);
            ForbiddenError.from(ability).throwUnlessCan(Action.ReadOne, data);
            return { meta: { message: ONE_USER }, data: { ...data } };
        } catch (error) {
            if (error instanceof ForbiddenError) throw new ForbiddenException(error.message);
        }
    }
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Create, subject: UserEntity })
    @Post()
    async create(@Body() content: CreateUserDto) {
        const userCreated = await this.userService.create(content);
        return { meta: { message: USER_CREATED }, data: { ...userCreated } };
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() content: EditUserDto, @User() user: UserEntity) {
        const ability = this.abilityFactory.defineAbility(user);
        try {
            const data = await this.userService.getOne(id);
            ForbiddenError.from(ability).throwUnlessCan(Action.Update, data);
            const userUpdated = await this.userService.update(id, content);
            return { meta: { message: USER_UPDATED }, data: { ...userUpdated } };
        } catch (error) {
            if (error instanceof ForbiddenError) throw new ForbiddenException(error.message);
        }
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.Delete, subject: UserEntity })
    async delete(@Param('id') id: string) {
        await this.userService.delete(id);
        return { meta: { message: USER_DELETED } };
    }
    @Put('roles/:id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.UpdateRole, subject: UserEntity })
    async updateRole(@Param('id') id: string, @Body() content: EditUserDto) {
        const userRoleUpdated = await this.userService.updateRole(id, content);
        delete userRoleUpdated.password;
        return { meta: { message: USER_UPDATED }, data: { ...userRoleUpdated } };
    }
    @Patch('farms/:id')
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @CheckAbilities({ action: Action.UpdateFarm, subject: UserEntity })
    async updateFarm(@Param('id') id: string, @Body() content: EditUserDto) {
        const userFarmUpdated = await this.userService.updateFarm(id, content);
        delete userFarmUpdated.password;
        delete userFarmUpdated.farm.createdAt;
        delete userFarmUpdated.farm.updatedAt;
        return { meta: { message: USER_UPDATED }, data: { ...userFarmUpdated } };
    }
}
