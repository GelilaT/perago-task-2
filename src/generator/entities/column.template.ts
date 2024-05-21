import Handlebars from "handlebars";

interface ColumnContext{
    decorators: string[]
    name: string
    type: string
}

const column = `
    {{#each decorators}}
    {{{this}}}
    {{/each}}
    {{{name}}}: {{{type}}}
`

export const columnTemplate = Handlebars.compile<ColumnContext>(column)