/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CreateUserDto, EditUserDto } from './dto';
import { User } from './entities';
import { FarmsService } from '../farms/farms.service';

export interface UserFindOne {
    dni?: string;
}

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RolesService,
        private readonly farmService: FarmsService,
    ) {}

    async getAll(option:IPaginationOptions): Promise<Pagination<User>> {
        return paginate(this.userRepository, option);
    }

    async getOne(dni: string): Promise<User> {
        const user = await this.userRepository.findOne(dni, {
            relations: [
                'role',
                'farm'
            ],
        });
        if (!user) throw new NotFoundException(`User doesn't exists`);  
        return user;
    }

    async create(content: CreateUserDto) {
        const { role, farm, ...rest } = content;
        const userFound = await this.userRepository.findOne(content.dni);
        if (userFound) throw new BadRequestException('Already exists one user with that dni');

        const roleFound = await this.roleService.findByName(role);
        if (!roleFound) {
            throw new NotFoundException(`Role doesn't exists`);
        }

        const farmFound = await this.farmService.findByName(farm);
        if (!farmFound) {
            throw new NotFoundException(`farm doesn't exists`);
        }
        let user = new User();
        user = Object.assign(user, rest);
        user.role = roleFound;
        user.farm = farmFound;
        const userCreated = await this.userRepository.save(user);
        delete userCreated.password;       
        return user;
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
        const roleFound = await this.roleService.findByName(content.role);
        if (!roleFound) throw new NotFoundException(`Role doesn't exists`);
        user.role = roleFound;

        const data = await this.userRepository.save(user);
        return data;
    }

    async updateFarm(id: string, content: EditUserDto) {
        const user = await this.userRepository.findOne(id, { relations: ['farm']});
        if (!user) throw new NotFoundException(`User doesn't exists`);
        const farmFound = await this.farmService.findByName(content.farm);
        if(!farmFound) throw new NotFoundException(`Farm doesn't exists`);
        user.farm = farmFound;

        const data = await this.userRepository.save(user);
        return data;
    }

    async findDni(data: UserFindOne) {
        return await this.userRepository.createQueryBuilder('user').where(data).addSelect('user.password').getOne();
    }
}
