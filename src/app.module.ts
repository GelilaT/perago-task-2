import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchemaModule } from './schema/schema.module';
import { TableModule } from './table/table.module';
import { ColumnModule } from './column/column.module';
import { GeneratorModule } from './generator/generator.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'mapper',
      // entities: [RoleEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    SchemaModule,
    TableModule,
    ColumnModule,
    GeneratorModule
    
  ],

})
export class AppModule {}
