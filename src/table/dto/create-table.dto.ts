import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, MinLength } from "class-validator";

export class CreateTableDto{
    
    @ApiProperty()
    @IsString()
    @MinLength(1)
    name: string

    @ApiProperty({ nullable: true, type: String, format: 'uuid', example: null })
    @IsUUID()
    schemaID: string

}