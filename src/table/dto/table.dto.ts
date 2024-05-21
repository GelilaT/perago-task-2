import { ApiProperty } from "@nestjs/swagger";
import { TableEntity } from "../../entities/table.entity";

export class TableDto{
    
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    schemaId: string


    constructor(table: TableEntity) {
        this.id = table.id;
        this.name = table.name;
        this.schemaId = table.schemaId
    }

}