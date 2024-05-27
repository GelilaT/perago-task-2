import { ColumnEntity } from "./column.entity";
import { SchemaEntity } from "./schema.entity"; 
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity('table')
export class TableEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string
    
    @OneToMany(() => ColumnEntity, (column) => column.table)
    columns: ColumnEntity[]

    // @Column()
    // schemaId: string

    @ManyToOne(() => SchemaEntity, (schema) => schema.tables, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'schemaId' })
    schema: SchemaEntity


}