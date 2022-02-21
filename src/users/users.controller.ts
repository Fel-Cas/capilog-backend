/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, EditUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Get()
    async getAll() {
        const users = await this.userService.getAll();
        return { message: 'All users', users };
    }
    @Get(':id')
    async getOne(@Param('id') id: string) {
        const user = await this.userService.getOne(id);
        return { message: 'User', user };
    }
    @Post()
    async create(@Body() content: CreateUserDto) {
        const userCreated = await this.userService.create(content);
        return { message: 'User created', userCreated };
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() content: EditUserDto) {
        const userUpdated = await this.userService.update(id, content);
        return { message: 'User updated', userUpdated };
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        const userDeleted = await this.userService.delete(id);
        delete userDeleted.password;
        return { message: 'User deleted', userDeleted };
    }
    @Put('roles/:id')
    async updateRole(@Param('id') id: string, @Body() content: EditUserDto) {
        const userRoleUpdated = await this.userService.updateRole(id, content);
        delete userRoleUpdated.password;
        return { message: 'User updated', userRoleUpdated };
    }
}
