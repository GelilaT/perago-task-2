import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { ColumnEntity } from 'src/entities/column.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity])],
  providers: [ColumnService],
  controllers: [ColumnController]
})
export class ColumnModule {}
