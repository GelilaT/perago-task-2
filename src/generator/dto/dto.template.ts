import Handlebars from "handlebars";

interface NameContext{
    name: string
}

const create = 'create{{name}}Dto'
const update = 'update{{name}}Dto'

interface DtoContext{
    name: string
    attributes: string[]
}

const dto = `
    export class {{name}} {
        {{#each attributes}}
        {{this}}
        {{/each}}
    }
`

export const createDtoTemplate = Handlebars.compile<NameContext>(create)
export const updateDtoTemplate = Handlebars.compile<NameContext>(update)
export const dtoTemplate = Handlebars.compile<DtoContext>(dto)