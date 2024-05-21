import { TableEntity } from "./table.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('schema')
export class SchemaEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @OneToMany(() => TableEntity, (table) => table.schema)
    tables : TableEntity[]
}