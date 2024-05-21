import { Module } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { SchemaController } from './schema.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchemaEntity } from '../entities/schema.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchemaEntity])],
  providers: [SchemaService],
  controllers: [SchemaController],
  exports: [SchemaService]
})
export class SchemaModule {}
