import { ColumnEntity } from "src/entities/column.entity"
import { importable } from "../dependency/types"
import { ValidateIsOptional } from "../dependency/classvalidator"
import { columnTemplate } from "../entities/column.template"
import { Case } from "change-case-all"
import { changeColumnType, changeToDataType } from "src/entities/enums/enum"

export class DtoAttribute{
    name: string
    dependency: importable[] = []

    constructor(
        readonly column: ColumnEntity,
        readonly isOptional: boolean = false
    ) { 

        this.dependency.push(...this.decorators)
    }

    get decorators(): importable[] {
        if (this.column.isNullable || this.isOptional) {
            return [new ValidateIsOptional(), changeToDataType(this.column.dataType)]
        }
        return [changeToDataType(this.column.dataType)]
    }

    getCode(): string{
        return columnTemplate({
            decorators: this.decorators.map((decorator) => decorator.getCode()),
            name: Case.camel(this.column.name),
            type: changeColumnType(this.column.dataType)
        })
    }
    
}