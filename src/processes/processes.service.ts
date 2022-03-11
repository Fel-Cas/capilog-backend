import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateProcessDto, UpdateProcessDto } from './dto';

import { Process } from './entities';

@Injectable()
export class ProcessesService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>
    ) {}

    async create(createProcessDto: CreateProcessDto) {
        const process = this.processRepository.create(createProcessDto);

        return await this.processRepository.save(process);
    }

    async getAll(option: IPaginationOptions): Promise<Pagination<Process>> {
        return paginate(this.processRepository, option);
    }

    async getOne(id: number): Promise<Process> {
        const process = await this.processRepository.findOne(id);
        if (!process) throw new NotFoundException(`Process doesn't exists`);
        return process;
    }

    async findByName(name: string) {
        const processFound = await this.processRepository.findOne({ name });
        if (!processFound) throw new NotFoundException(`Process doesn't exists`);
        return processFound;
    }

    async update(id: number, updateProcessDto: UpdateProcessDto) {
        const process = await this.processRepository.findOne(id);
        if (!process) throw new NotFoundException(`Process doesn't exists`);
        const processEdit = Object.assign(process, updateProcessDto);
        const data = await this.processRepository.save(processEdit);
        return data;
    }

    async remove(id: number) {
        const process = await this.processRepository.findOne(id);
        if (!process) throw new NotFoundException(`Process doesn't exists`);
        const data = await this.processRepository.delete(id);
        return data;
    }
}
