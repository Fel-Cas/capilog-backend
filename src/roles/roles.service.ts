/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) {}
    async create(createRoleDto: CreateRoleDto) {
        const roleFound = await this.findByName(createRoleDto.role);
        if (roleFound) throw new BadRequestException(`Already exists that role`);
        const role = await this.roleRepository.create(createRoleDto);
        return await this.roleRepository.save(role);
    }

    async findAll() {
        return await this.roleRepository.find();
    }

    async findOne(id: number) {
        const role = await this.roleRepository.findOne(id);
        if (!role) throw new NotFoundException(`Role doesn't exists`);
        return role;
    }

    async update(id: number, updateRoleDto: UpdateRoleDto) {
        const roleFound = await this.findOne(id);
        if (!roleFound) throw new NotFoundException(`Role doesn't exists`);
        const roleUpdated = Object.assign(roleFound, updateRoleDto);
        return await this.roleRepository.save(roleUpdated);
    }

    async delete(id: number) {
        const role = await this.findOne(id);
        if (!role) throw new NotFoundException('Role doesnt exists');
        await this.roleRepository.remove(role);
    }

    async findByName(role: string) {
        const roleFound = await this.roleRepository.findOne({ where: { role: role } });
        return roleFound;
    }
}
