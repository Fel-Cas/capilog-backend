/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dto';
import { Role, User } from './entities';
import * as bcrypt from 'bcrypt';

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
    try {
        const { dni, name, lastname, role, password, phone, email } = content;
        const roleFound = await this.roleRepository.find({
         where:{
             role:role,
         }
        }); 
        if (!roleFound) throw new NotFoundException(`Role doesn't exists`);
        const user = new User();
        user.dni = dni;
        user.name = name;
        user.lastname = lastname;
        user.password = await this.encryptPassword(password);
        user.phone = phone;
        user.email = email;
        user.role = roleFound[0];
        return await this.userRepository.save(user);
    } catch (error) {
        throw new InternalServerErrorException();
    }
  }
  async update(id: string, content: EditUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException(`User doesn't exists`);
    const editedUser = Object.assign(user, content);
    return await this.userRepository.save(editedUser);
  }
  async delete(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException(`User doesn't exists`);
    return await this.userRepository.delete(id);
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
  
  async updatePassword(id: string, content: EditUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException(`User doesn't exits`);
    user.password= await this.encryptPassword(content.password);
    return await this.userRepository.save(user);
  }

  async comparePasswords (password,encryptedPassword):Promise <boolean> {
    return await bcrypt.compare(password, encryptedPassword)
  }
  private async encryptPassword (password: string): Promise<string>{
    const saltOrRounds = 10;
    return await bcrypt.hash(password,saltOrRounds)
  }  
}
