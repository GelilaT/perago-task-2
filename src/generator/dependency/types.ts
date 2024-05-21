import { Case } from "change-case-all";
import { decoratorTemplate } from "./common.template"
import { backRefTemplate, refTableTemplate } from "./typeorm.template";

export const stringify = (options: { [key: string]: any }): string | null => {
  const code = [];

  for (let key in options) {
    code.push(`${key}: ${options[key]}`);
  }

  if (code.length > 0) {
    return `{ ${code.join(', ')} }`;
  }
};

export interface importable{
    name: string
    module: string | null
    dependency: importable[]
    getCode: () => string
}

export type ImportableTypes = 'Controller' | 'Service' | 'Module' | 'Dto' | 'Entity'

export interface Folder{
    [key: string]: {
        [key in ImportableTypes]: string
    }
}

export class TypeOrmOneToOne implements importable{
    readonly name = 'OneToOne'
    readonly module = 'typeorm'
    readonly dependency = []

    constructor(
        readonly tableName: string,
        readonly column: string | null,
        readonly options: { [key: string]: any }
    ) { }
    getCode(): string{
        const params = [
            refTableTemplate({
                table: Case.pascal(this.tableName)
            })
        ]
        if (this.column) {
            params.push(
                backRefTemplate({
                    backRef: Case.pascal(this.column),
                    refTable: Case.pascal(this.tableName)
                })
            )
        }
        const options = stringify(this.options)
        if (options) params.push(options)
        
        return decoratorTemplate({
            name: this.name,
            params
        })
    }
}

export class TypeOrmManyToOne implements importable{
    readonly name = 'ManyToOne'
    readonly module = 'typeorm'
    readonly dependency = []

    constructor(
        readonly tableName: string,
        readonly backrefName: string | null,
        readonly options: { [key: string]: any }
    ) { }
    
    getCode(): string{
        const params = [
            refTableTemplate({
                table: Case.pascal(this.tableName)
            })
        ]
        if (this.backrefName) {
            params.push(
                backRefTemplate({
                    backRef: Case.pascal(this.backrefName),
                    refTable: Case.pascal(this.tableName)
                })
            )
        }
        const options = stringify(this.options)
        if (options) params.push(options)
        
        return decoratorTemplate({
            name: this.name,
            params
        })
    }
}

export class TypeOrmColumn implements importable {
    public name = 'Column'
    readonly module = 'typeorm'
    readonly dependency = []

    constructor(readonly options?: { [key: string]: any }) { }
    
    getCode(): string {
        return decoratorTemplate({
            name: this.name,
            params: this.options? [stringify(this.options)] : []
       })
    }
}


