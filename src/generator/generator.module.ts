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

@Module({
  imports: [TypeOrmModule.forFeature([TableEntity]), TypeOrmModule.forFeature([SchemaEntity]), SchemaModule, TableModule],
  providers: [CodeGeneratorService, TableService, FileService],
  controllers: [GeneratorController]
})
export class GeneratorModule {}
