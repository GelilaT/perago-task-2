import { Injectable } from "@nestjs/common";
import { TableEntity } from "src/entities/table.entity";
import { SchemaService } from "src/schema/schema.service";
import { entityTemplate } from "./entities/entity.template";
import { ColumnEntity } from "src/entities/column.entity";
import { columnTemplate } from "./entities/column.template";
import { changeColumnType, RelationType } from "src/entities/enums/enum";
import { FileService } from "./file/file.service";
import { importable, TypeOrmManyToOne, TypeOrmOneToOne } from "./dependency/types";

@Injectable()
export class CodeGeneratorService{
    constructor(
        private schemaService: SchemaService,
        private fileService: FileService
    ) {}

    async generator(id: string) {
        const schema = await this.schemaService.findOne(id)
        
        let code = []
        for (let table of schema.tables) {
            code.push(this.generateTableCode(table))
        }
        
        return code.join('\n')
    }
    async generateCode(id: string, data) { 
    
        try {           
            const content = await this.generator(id)
            console.log(content)
            await this.fileService.createFile('C:\\Users\\25198\\OneDrive\\Desktop\\Perago-tasks\\storage', 'entity', content);
            return { message: 'Code generation successful' };
            
        } catch (error) {
            console.error('Error generating code:', error);
            return { error: 'Failed to generate code' };
        }
    }

    generateTableCode(table: TableEntity): string {
        return entityTemplate({
            name: table.name,
            attributes: table.columns.map((col) => this.generateColumnCode(col))
        })
    }

    generateColumnCode(column: ColumnEntity): string {
        const decorator = this.getDecorator(column)
        
        return columnTemplate({
            decorators: decorator.map((d) => d.getCode()),
            name: column.name,
            type: changeColumnType(column.dataType)
        })
    }

    getDecorator(column: ColumnEntity): importable[] {
        if (column.relationType === RelationType.MANY_TO_ONE) {
            return [
                new TypeOrmManyToOne(
                    column.reference.table.name,
                    column.backref,
                    { nullable: column.isNullable },
                ),
            ]
        } else if (column.relationType === RelationType.ONE_TO_ONE) {
            return [
                new TypeOrmOneToOne(
                    column.reference.table.name,
                    column.backref,
                    { nullable: column.isNullable },
                ),
            ]
        }
    }


}