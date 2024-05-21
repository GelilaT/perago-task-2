import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchemaEntity } from '../entities/schema.entity';
import { Repository } from 'typeorm';
import { CreateSchemaDto } from './dto/create-schema.dto';

@Injectable()
export class SchemaService {
    
    constructor(@InjectRepository(SchemaEntity)
    private schemaRepository: Repository<SchemaEntity>
    ) { }
    
    async create(createSchemaDto: CreateSchemaDto) {
        const schema = this.schemaRepository.create(createSchemaDto)
        return this.schemaRepository.save(schema)
    }

    async findOne(id: string) {
        return this.schemaRepository.findOne({
            where: { id },
            relations: {
                tables: {
                    columns: true
                }
            }
        })
    }

    async findAll() {
        return this.schemaRepository.find()
    }

    async update(id: string, updateSchemaDto) {
        await this.schemaRepository.update(id, updateSchemaDto)
        return { id, ...updateSchemaDto } as SchemaEntity
    }

    async delete(id: string) {
        await this.schemaRepository.delete(id)
    }
}
