import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as fs from 'fs-extra';
import * as path from 'path';
import { SchemaService } from 'src/schema/schema.service';
import * as prettier from 'prettier';
// import { TableService } from 'src/table/table.service';
// import { ColumnService } from 'src/column/column.service';

@Injectable()
export class CodeGeneratorService {
  constructor(
    private schemaService: SchemaService,
  ) {
    
    Handlebars.registerHelper('camelCase', (str: string) => {
      if (!str) return '';  
      return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    });

    Handlebars.registerHelper('PascalCase', (str: string) => {
      if (!str) return '';  
      return str.replace(/(?:^|_)([a-z])/g, (g) => g[1].toUpperCase());
    });
    Handlebars.registerHelper('kebabCase', (str: string) => {
      if (!str) return '';  
      return str.replace(/(?:^|_)([a-z])/g, (g) => g[1].toUpperCase());
    });

    Handlebars.registerHelper('eq', (a: any, b: any) => a === b);
    
  }

  private async generateTemplate(source: string, data: any, outputPath: string) {
    const templatePath = path.join('./src/generator', 'templates', `${source}.hbs`);
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template = Handlebars.compile(templateSource);

    let result = template(data);
    const prettierConfigPath = path.join(__dirname, '..', '.prettierrc');
    if (fs.existsSync(prettierConfigPath)) {
      const prettierConfig = JSON.parse(fs.readFileSync(prettierConfigPath, 'utf-8'));
      result = await prettier.format(result, { ...prettierConfig, parser: 'typescript' });
    } else {
      result = await prettier.format(result, { parser: 'typescript' });
    }
    fs.outputFileSync(outputPath, result);

    console.log(`Generated ${outputPath}`);
  }

  private generateCode(entityData: any, entityName: string) {
    const data = {
      ClassName: entityData.className,
      PrimaryKey: entityData.primaryKey ? entityData.primaryKey.name : null,
      PrimaryKeyType: entityData.primaryKey ? entityData.primaryKey.type : null,
      Properties: entityData.properties,
      Relationships: entityData.relationships,
    };
    const basePath = process.cwd()
    const outputPath = path.join(basePath,'generator', `${entityName}.ts`);
    this.generateTemplate('entity-template', data, outputPath);
  }

  public async generateSchemaCode(id: string) {
    const schema = await this.schemaService.findOne(id)

    for (const table of schema.tables) {
        const tableData = {
          className: table.name,
          primaryKey: table.columns.find(column => column.isPrimary),
          properties: table.columns.map(column => ({
            Name: column.name,
            Type: column.dataType,
            Nullable: column.isNullable,
            RelationType: column.relationType,
            IsForiegn: column.isForeign,
            IsGenerated: column.isGenerated,
          })),
          relationships: [],  
        };

      this.generateCode(tableData, table.name);
      this.generateDto(tableData)
      }
      const schemaData = {
        className: schema.name,
        primaryKey: null,
        properties: [],
        relationships: schema.tables.map(table => ({
          RelationshipType: 'OneToMany',
          RelatedEntity: table.name
      })),
    };
    this.generateCode(schemaData, schema.name);
    this.generateDto(schemaData)
  }
  
  public async generateController(id: string) {
    const schema = await this.schemaService.findOne(id)
    const data = {
      ClassName: schema.name
    }
    const basePath = process.cwd()
    const outputPath = path.join(basePath, 'generator', `${schema.name}.controller.ts`);

    await this.generateTemplate('controller-template', data, outputPath)

  }
  public async generateModule(id: string) {
    const schema = await this.schemaService.findOne(id)
    const data = {
      ClassName: schema.name
    }
    const basePath = process.cwd()
    const outputPath = path.join(basePath, 'generator', `${schema.name}.module.ts`);

    await this.generateTemplate('module-template', data, outputPath)

  }
  public async generateService(id: string) {
    const schema = await this.schemaService.findOne(id)
    const data = {
      ClassName: schema.name
    }
    const basePath = process.cwd()
    const outputPath = path.join(basePath, 'generator', `${data.ClassName}.service.ts`)
    await this.generateTemplate('service-template', data, outputPath)

  }
  public async generateDto(data: any) {

    const basePath = process.cwd()
    const outputPath = path.join(basePath, 'generator', `${data.className}.dto.ts`);
    await this.generateTemplate('dto-template', data, outputPath);

    const createOutputPath = path.join(basePath, 'generator', `create-${data.className}.dto.ts`);
    await this.generateTemplate('dto-template', data, createOutputPath);

    const updateOutputPath = path.join(basePath,'generator', `update-${data.className}.dto.ts`);
    await this.generateTemplate('dto-template', data, updateOutputPath);
  }
}

  































































//   private parseEntityFile(filePath: string) {
    
//     const content = fs.readFileSync(filePath, 'utf-8');
//     const classNameMatch = content.match(/export class (\w+)/);
//     if (!classNameMatch) {
//       throw new Error('Class name not found');
//     }
      
//     const className = classNameMatch[1];
//     const primaryKeyMatch = content.match(/@PrimaryGeneratedColumn\(([^)]+)\)\s+(\w+): (\w+)/);
//     const primaryKey = primaryKeyMatch ? { name: primaryKeyMatch[2], type: primaryKeyMatch[3] } : null;

//     const propertyMatches = [...content.matchAll(/@Column\(([^)]+)\)\s+(\w+): (\w+)/g)];
//     const properties = propertyMatches.map(match => {
//       const options = match[1];
//       const name = match[2];
//       const type = match[3];
//       const nullableMatch = options.match(/nullable: (\w+)/);
//       const uniqueMatch = options.match(/unique: true/);

//       return {
//         Name: name,
//         Type: type,
//         Nullable: nullableMatch ? nullableMatch[1] : 'false',
//         Unique: !!uniqueMatch
//       };
//     });

//     const relationshipMatches = [
//       ...content.matchAll(/@(ManyToOne|OneToOne|OneToMany)\(\(\) => (\w+), (\w+) => (\w+)\.\w+\)/g),
//     ];
//     const relationships = relationshipMatches.map(match => {
//       return {
//         RelationshipType: match[1].toLowerCase(),
//         RelatedEntity: match[2],
//         RelatedProperty: match[3]
//       };
//     });

//     return { className, primaryKey, properties, relationships };
//   }

//   private  generateTemplate(templateName: string, data: any, outputPath: string) {
//     const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.hbs`);
//     const templateSource = fs.readFileSync(templatePath, 'utf-8');
//     const template = Handlebars.compile(templateSource);

//     const result = template(data);
//     fs.outputFileSync(outputPath, result);

//     console.log(`Generated ${outputPath}`);
//   }

//   public generateCode(entityFilePath: string) {
//     const entityData = this.parseEntityFile(entityFilePath);

//     const data = {
//       ClassName: entityData.className,
//       PrimaryKey: entityData.primaryKey ? entityData.primaryKey.name : null,
//       PrimaryKeyType: entityData.primaryKey ? entityData.primaryKey.type : null,
//       Properties: entityData.properties,
//       Relationships: entityData.relationships,
//     };
      
    
//     const basePath = process.cwd()
//     // const entityPath = path.join(basePath, 'generator', 'entity')
//     const outputPath = path.join(basePath, 'generator', `${data.ClassName}.ts`);
//     this.generateTemplate('entity', data, outputPath);
//   }
// }
































































// import { Injectable } from "@nestjs/common";
// import { TableEntity } from "src/entities/table.entity";
// import { SchemaService } from "src/schema/schema.service";
// import { entityTemplate } from "./entities/entity.template";
// import { ColumnEntity } from "src/entities/column.entity";
// import { columnTemplate } from "./entities/column.template";
// import { changeColumnType, RelationType } from "src/entities/enums/enum";
// import { FileService } from "./file/file.service";
// import { importable, TypeOrmManyToOne, TypeOrmOneToOne } from "./dependency/types";

// @Injectable()
// export class CodeGeneratorService{
//     constructor(
//         private schemaService: SchemaService,
//         private fileService: FileService
//     ) {}

//     async generator(id: string) {
//         const schema = await this.schemaService.findOne(id)
        
//         let code = []
//         for (let table of schema.tables) {
//             code.push(this.generateTableCode(table))
//         }
        
//         return code.join('\n')
//     }
//     async generateCode(id: string, data) { 
    
//         try {           
//             const content = await this.generator(id)
//             console.log(content)
//             await this.fileService.createFile('C:\\Users\\25198\\OneDrive\\Desktop\\Perago-tasks\\storage', 'entity', content);
//             return { message: 'Code generation successful' };
            
//         } catch (error) {
//             console.error('Error generating code:', error);
//             return { error: 'Failed to generate code' };
//         }
//     }

//     generateTableCode(table: TableEntity): string {
//         return entityTemplate({
//             name: table.name,
//             attributes: table.columns.map((col) => this.generateColumnCode(col))
//         })
//     }

//     generateColumnCode(column: ColumnEntity): string {
//         const decorator = this.getDecorator(column)
        
//         return columnTemplate({
//             decorators: decorator.map((d) => d.getCode()),
//             name: column.name,
//             type: changeColumnType(column.dataType)
//         })
//     }

//     getDecorator(column: ColumnEntity): importable[] {
//         if (column.relationType === RelationType.MANY_TO_ONE) {
//             return [
//                 new TypeOrmManyToOne(
//                     column.reference.table.name,
//                     column.backref,
//                     { nullable: column.isNullable },
//                 ),
//             ]
//         } else if (column.relationType === RelationType.ONE_TO_ONE) {
//             return [
//                 new TypeOrmOneToOne(
//                     column.reference.table.name,
//                     column.backref,
//                     { nullable: column.isNullable },
//                 ),
//             ]
//         }
//     }


// }