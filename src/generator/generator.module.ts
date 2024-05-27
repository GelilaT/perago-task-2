import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeGeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';
import { SchemaEntity } from 'src/entities/schema.entity';
import { SchemaModule } from 'src/schema/schema.module';
import { TableService } from 'src/table/table.service';
import { TableModule } from 'src/table/table.module';
import { TableEntity } from 'src/entities/table.entity';
import { FileService } from './file/file.service';
import { ColumnService } from 'src/column/column.service';
import { ColumnEntity } from 'src/entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TableEntity]), TypeOrmModule.forFeature([SchemaEntity]), TypeOrmModule.forFeature([ColumnEntity]),SchemaModule, TableModule],
  providers: [CodeGeneratorService, TableService, FileService, ColumnService],
  controllers: [GeneratorController]
})
export class GeneratorModule {}
