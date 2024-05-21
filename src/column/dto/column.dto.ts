import { ApiProperty } from "@nestjs/swagger";

export class ColumnDto{
   
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    tableId: string

    @ApiProperty()
    dataType: string

    @ApiProperty()
    isNullable: boolean

    @ApiProperty()
    isForeign: boolean

    @ApiProperty()
    isPrimary: boolean

}