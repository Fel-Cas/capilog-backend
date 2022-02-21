/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dto';
import { Role, User } from './entities';

export interface UserFindOne {
    dni?: string;
}

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) {}

    async getAll(): Promise<User[]> {
        const users = await this.userRepository.find({
            relations: ['role'],
        });
        if (users.length === 0) throw new NotFoundException(`There aren't users in database`);
        return users;
    }

    async getOne(dni: string): Promise<User> {
        const user = await this.userRepository.findOne(dni, {
            relations: ['role'],
        });
        if (!user) throw new NotFoundException(`User doesn't exists`);
        return user;
    }

    async create(content: CreateUserDto) {
        const { role, ...rest } = content;
        let userFound = await this.userRepository.findOne(content.dni);
        if (userFound) throw new BadRequestException('Already exits one user with that dni');

        const roleFound = await this.roleRepository.find({
            where: {
                role: role,
            },
        });

        if (roleFound.length === 0) {
            throw new NotFoundException(`Role doesn't exists`);
        }
        let user = new User();
        user = Object.assign(user, rest);
        user.role = roleFound[0];
        const userCreated = await this.userRepository.save(user);
        delete userCreated.password;
        return userCreated;
    }
    async update(dni: string, content: EditUserDto) {
        const user = await this.userRepository.findOne(dni);
        if (!user) throw new NotFoundException(`User doesn't exists`);
        const editedUser = Object.assign(user, content);
        const data = await this.userRepository.save(editedUser);
        delete data.password;
        return data;
    }

    async delete(dni: string) {
        const user = await this.userRepository.findOne(dni);
        if (!user) throw new NotFoundException(`User doesn't exists`);
        const data = await this.userRepository.remove(user);
        return data;
    }

    async updateRole(id: string, content: EditUserDto) {
        const user = await this.userRepository.findOne(id, { relations: ['role'] });
        if (!user) throw new NotFoundException(`User doesn't exists`);
        const roleFound = await this.roleRepository.find({
            where: {
                role: content.role,
            },
        });
        if (roleFound.length === 0) throw new NotFoundException(`Role doesn't exists`);
        user.role = roleFound[0];

        const data = await this.userRepository.save(user);
        return data;
    }

    async findDni(data: UserFindOne) {
        return await this.userRepository.createQueryBuilder('user').where(data).addSelect('user.password').getOne();
    }
}
