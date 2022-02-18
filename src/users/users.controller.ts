/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateUserDto, EditUserDto } from './dto';
  import { UsersService } from './users.service';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Get()
    async getAll() {
      const data=await this.userService.getAll();
      return {message:'Users obtained', data};
    }
    @Get(':id')
    async getOne(@Param('id') id: string) {
      const data=await this.userService.getOne(id);
      return {message:'User obtained', data};
    }
    @Post()
    async create(@Body() content: CreateUserDto) {
      const data=await this.userService.create(content);
      return {message:'User created', data};
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() content: EditUserDto) {
      const data=await this.userService.update(id, content);
      return {message:'User updated', data};
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
      const data=await this.userService.delete(id);
      return {message:'User deleted', data};
    }
    @Put('roles/:id')
    async updateRole(@Param('id') id:string, @Body() content: EditUserDto) {
      const data=await this.userService.updateRole(id,content);
      return {message:'Role updated', data}; 
    }
  }