import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { CreateSchemaDto } from './dto/create-schema.dto';
import { UpdateSchemaDto } from './dto/update-schema.dto';

@Controller('schema')
export class SchemaController {
    constructor(private schemaService: SchemaService) { }
    
    @Post()
    async create(@Body() createSchemaDto: CreateSchemaDto) {
        return this.schemaService.create(createSchemaDto)
    }

    @Get()
    async findAll() {
        return this.schemaService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.schemaService.findOne(id)
        } catch (err) {
            throw new NotFoundException(err.message)
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateSchemaDto: UpdateSchemaDto) {
        try {
            return await this.schemaService.update(id, updateSchemaDto)
        } catch (err) {
            throw new NotFoundException(err.message)
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            return await this.schemaService.delete(id);
        } catch (err) {
            throw new NotFoundException(err.message);
        }
    }
}
