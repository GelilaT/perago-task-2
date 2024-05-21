import { ApiProperty } from "@nestjs/swagger";
import { SchemaEntity } from "../../entities/schema.entity";

export class SchemaDto{
    
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    constructor(schema: SchemaEntity) {
        this.id = schema.id;
        this.name = schema.name;
    }
}