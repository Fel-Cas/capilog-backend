/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CreateUserDto, EditUserDto } from './dto';
import { User } from './entities';
import { FarmsService } from '../farms/farms.service';
import { FARM_NOT_EXISTS, ROLE_NOT_EXISTS, USER_ALREADY_EXISTS, USER_NOT_EXISTS } from 'src/common/messages';

export interface UserFindOne {
    dni?: string;
}

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RolesService,
        private readonly farmService: FarmsService
    ) {}

    async getAll(option: IPaginationOptions): Promise<Pagination<User>> {
        return paginate(this.userRepository, option);
    }

    async getOne(dni: string): Promise<User> {
        const user = await this.userRepository.findOne(dni);
        if (!user) throw new NotFoundException(USER_NOT_EXISTS);
        return user;
    }

    async create(content: CreateUserDto) {
        const { role, farm, ...rest } = content;
        const userFound = await this.userRepository.findOne(content.dni);
        if (userFound) throw new BadRequestException(USER_ALREADY_EXISTS);

        const roleFound = await this.roleService.findByName(role);
        if (!roleFound) {
            throw new NotFoundException(ROLE_NOT_EXISTS);
        }

        const farmFound = await this.farmService.findByName(farm);
        if (!farmFound) {
            throw new NotFoundException(FARM_NOT_EXISTS);
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
        if (!user) throw new NotFoundException(USER_NOT_EXISTS);
        const editedUser = Object.assign(user, content);
        const data = await this.userRepository.save(editedUser);
        delete data.password;
        return data;
    }

    async delete(dni: string) {
        const user = await this.userRepository.findOne(dni);
        if (!user) throw new NotFoundException(USER_NOT_EXISTS);
        const data = await this.userRepository.remove(user);
        return data;
    }

    async updateRole(id: string, content: EditUserDto) {
        const user = await this.userRepository.findOne(id, { relations: ['role'] });
        if (!user) throw new NotFoundException(FARM_NOT_EXISTS);
        const roleFound = await this.roleService.findByName(content.role);
        if (!roleFound) throw new NotFoundException(ROLE_NOT_EXISTS);
        user.role = roleFound;

        const data = await this.userRepository.save(user);
        return data;
    }

    async updateFarm(id: string, content: EditUserDto) {
        const user = await this.userRepository.findOne(id, { relations: ['farm'] });
        if (!user) throw new NotFoundException(USER_NOT_EXISTS);
        const farmFound = await this.farmService.findByName(content.farm);
        if (!farmFound) throw new NotFoundException(FARM_NOT_EXISTS);
        user.farm = farmFound;

        const data = await this.userRepository.save(user);
        return data;
    }

    async findDni(data: UserFindOne) {
        return await this.userRepository.createQueryBuilder('User').leftJoinAndSelect("User.role","role").where("User.dni = :dni", data).addSelect('User.password').getOne();
    }
}
