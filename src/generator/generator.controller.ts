import { Body, Controller, Get, Param } from "@nestjs/common"
import { CodeGeneratorService } from "./generator.service"

@Controller('generator')
export class GeneratorController {
    constructor(private codeGeneratorService: CodeGeneratorService,
    ) { }
    
    @Get(':id')
    async generateSchemas(@Param('id') id: string) {
        await this.codeGeneratorService.generateSchemaCode(id)
        await this.codeGeneratorService.generateController(id)
        await this.codeGeneratorService.generateModule(id)
        await this.codeGeneratorService.generateService(id)
    }



}
