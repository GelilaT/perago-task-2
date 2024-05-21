import { TableEntity } from "src/entities/table.entity";
import { importable } from "../dependency/types";
import { DtoAttribute } from "./dto-attribute";
import { createDtoTemplate, dtoTemplate } from "./dto.template";
import { Case } from "change-case-all";

export class CreateDto implements importable{
    name: string
    dependency: importable[] = [];
    columns: DtoAttribute[] = []

    constructor(
        public module: string,
        readonly table: TableEntity
    ) {
        
        this.name = createDtoTemplate({
            name: Case.pascal(table.name)
        })

        this.columns = this.table.columns.map(
            (column) => new DtoAttribute(column)
        )

        this.dependency.push(
            ...this.columns.flatMap(
                (column) => column.dependency.map((dep) => {
                    if (dep.module === null) {
                        dep.module = this.module
                    }
                    return dep
                })
            )
        )
    }

    getCode(): string{
        return dtoTemplate({
            name: this.name,
            attributes: this.columns.map((column) => column.getCode())
        })
    }
}