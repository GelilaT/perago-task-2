import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('column')
export class ColumnController {
    constructor(private columnService: ColumnService) { }
    
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.columnService.findOne(id)
    }

    @Get()
    async findAll() {
        return this.columnService.findAll()
    }

    @Post()
    async create(@Body() createColumnDto: CreateColumnDto) {
        return this.columnService.create(createColumnDto)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
        return this.columnService.update(id, updateColumnDto)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.columnService.delete(id)
    }

}
