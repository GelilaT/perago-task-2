import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/entities/column.entity';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { columnType } from '../entities/enums/enum';
import { TableEntity } from 'src/entities/table.entity';

@Injectable()
export class ColumnService {
    constructor(@InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>) { }
    
    change(type: string) {
        switch (type) {
            case 'CHAR':
                return columnType.CHAR
            case 'VARCHAR':
                return columnType.VARCHAR
            case 'TEXT':
                return columnType.TEXT
            case 'BOOLEAN':
                return columnType.BOOLEAN
            case 'TINYINT':
                return columnType.TINYINT
            case 'INTEGER':
                return columnType.INTEGER
            case 'BIGINT':
                return columnType.BIGINT
            case 'FLOAT':
                return columnType.FLOAT
            case 'DOUBLE':
                return columnType.DOUBLE
            case 'DATE':
                return columnType.DATE
            case 'TIME':
                return columnType.TIME
            case 'TIMESTAMP':
                return columnType.TIMESTAMP 
            default:
                throw new Error(`Unknown Type: ${type}`)
        }
    }

    async create(createColumnDto: CreateColumnDto) {
     
        const newType = createColumnDto.dataType.toLocaleUpperCase()
        this.change(newType)
        try {
            const column = this.columnRepository.create(createColumnDto)
            return await this.columnRepository.save(column)   
        } catch (err) {
            throw new Error(err.message)
        }
            
    }
    
    async findAll() {
        return await this.columnRepository.find()
    }

    async findOne(id: string) {
        const column =  await this.columnRepository.findOne({
            where: { id },
            relations: {
            table: true
            }
        })
        return column
        
    }

    async update(id: string, updateColumnDto: UpdateColumnDto) {
        // const updated = { ...updateColumnDto }
        // if (updateColumnDto.dataType) {
        //     try {
        //         updated.dataType = this.change(updateColumnDto.dataType.toLocaleUpperCase())
        //     } catch (err) {
        //         throw new Error(err.message)
        //     }
        // }
        await this.columnRepository.update(id, updateColumnDto)
        return this.findOne(id)

    }

    async delete(id: string) {
        try {
            await this.columnRepository.delete(id)
        } catch(err) {
            throw new BadRequestException(err.message)
        }
    }

}
