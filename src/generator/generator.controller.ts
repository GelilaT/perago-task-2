import { Body, Controller, Get, Param } from "@nestjs/common"
import { CodeGeneratorService } from "./generator.service"
import { TableService } from "src/table/table.service"

@Controller('generator')
export class GeneratorController {
    constructor(private generatorService: CodeGeneratorService,
        private tableService: TableService
    ) { }
    
    @Get(':id')
    async getEntityCode(@Param('id') id: string, @Body() file: {}) {
        return this.generatorService.generateCode(id, file)
    }

}
