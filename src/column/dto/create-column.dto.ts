import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, IsUUID } from "class-validator";
import { columnType } from "../../entities/enums/enum";

export class CreateColumnDto{
    
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    dataType: columnType

    @ApiProperty()
    @IsUUID()
    tableId: string

    @ApiProperty()
    @IsBoolean()
    isNullable: boolean

    @ApiProperty()
    @IsBoolean()
    isPrimary: boolean

    @ApiProperty()
    @IsBoolean()
    isForeign: boolean

}