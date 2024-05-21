import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Controller('table')
export class TableController {
    constructor(private tableService: TableService) { }
    
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.tableService.findOne(id)
    }

    @Get()
    async findAll() {
        return this.tableService.findAll()
    }

    @Post()
    async create(@Body() CreateTableDto: CreateTableDto) {
        return await this.tableService.create(CreateTableDto)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
        try {
            return this.tableService.update(id, updateTableDto)
        } catch (err) {
            throw new Error(err.message)
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.tableService.delete(id)
    }
}
