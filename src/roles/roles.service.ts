/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Role } from './entities';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) {}
    async findAll(option: IPaginationOptions): Promise<Pagination<Role>> {
        return paginate(this.roleRepository, option);
    }

    async findByName(role: string) {
        const roleFound = await this.roleRepository.findOne({ where: { role: role } });
        return roleFound;
    }
}
