import { TableEntity } from "./table.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { columnType, RelationType } from "./enums/enum"

@Entity('column')
export class ColumnEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    tableId : string

    @ManyToOne(() => TableEntity, (table) => table.columns)
    @JoinColumn({name: 'tableId'})
    table: TableEntity

    @Column()
    dataType: columnType

    @Column()
    isNullable: boolean

    @Column()
    isPrimary: boolean

    @Column()
    isForeign: boolean

    @Column({
        type: 'enum',
        enum: RelationType,
        nullable: true
    })
    relationType: RelationType

    @Column()
    backref: string

    @Column({ default: false })
    isGenerated: boolean

    @ManyToOne(() => ColumnEntity, {
        nullable: true,
        cascade: true
    })
    @JoinColumn()
    reference: ColumnEntity
    
}