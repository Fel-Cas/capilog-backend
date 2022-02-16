/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dto';
import { Role, User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['role'],
    });
    if (users.length === 0)
      throw new NotFoundException(`There aren't users in database`);
    return users;
  }
  async getOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id,{
        relations: ['role']
    });
    if (!user) throw new NotFoundException(`user doesn't exits`);
    return user;
  }
  async create(content: CreateUserDto) {
   
    const { dni, name, lastname, role, password, phone, email } = content;
    const roleFound = await this.roleRepository.find({
      where:{
          role:role,
      }
    }); 
    if (roleFound.length === 0) {
      throw new NotFoundException(`Role doesn't exists`);
      }    
    const user = new User();
    user.dni = dni;
    user.name = name;
    user.lastname = lastname;
    user.password = password
    user.phone = phone;
    user.email = email;
    user.role = roleFound[0];
    const userCreated= await this.userRepository.save(user);
    delete userCreated.password;
    return {message:'User created', userCreated};
   
  }
  async update(id: string, content: EditUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException(`User doesn't exists`);
    const editedUser = Object.assign(user, content);
    const data= await this.userRepository.save(editedUser);
    delete data.password;
    return {message:'User updated', data};
  }
  async delete(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException(`User doesn't exists`);
    const data= await this.userRepository.remove(user);
    return {message:'User deleted', data};
  }
  
  async updateRole(id: string, content: EditUserDto) {
    const user = await this.userRepository.findOne(id,{relations: ['role'],})
    if (!user) throw new NotFoundException(`User doesn't exits`);
    const roleFound = await this.roleRepository.find({
      where:{
          role:content.role,
      }
     });
    user.role=roleFound[0];
    return await this.userRepository.save(user);
  }
  
}
