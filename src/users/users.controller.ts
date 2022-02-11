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
  getAll() {
    return this.userService.getAll();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.getOne(id);
  }
  @Post()
  create(@Body() content: CreateUserDto) {
    return this.userService.create(content);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() content: EditUserDto) {
    return this.userService.update(id, content);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
  @Put('passwords/:id')
  updatePassword(@Param('id') id:string, @Body() content: EditUserDto) {
    return this.userService.updatePassword(id,content); 
  }

  @Put('roles/:id')
  updateRole(@Param('id') id:string, @Body() content: EditUserDto) {
    return this.userService.updateRole(id,content); 
  }
}
