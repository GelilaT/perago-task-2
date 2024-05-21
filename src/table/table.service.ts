import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableEntity } from '../entities/table.entity';
import { Repository } from 'typeorm';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
    
    constructor(@InjectRepository(TableEntity)
    private tableRepository: Repository<TableEntity>
    ) {}
    
    async findOne(id: string) {
        const table = this.tableRepository.findOne({ where: { id } })
        if (!table) {
            throw new NotFoundException()
        }
        return table
    }

    async findAll() {
        return await this.tableRepository.find()
    }

    async create(createTableDto: CreateTableDto) {
        const table = this.tableRepository.create(createTableDto)
        return this.tableRepository.save(table)
    }

    async update(id: string, updateTableDto: UpdateTableDto) {
        await this.tableRepository.update(id, updateTableDto)
        return {id, ...updateTableDto}
    }

    async delete(id: string) {
        await this.tableRepository.delete(id)
    }

}
