import { ValidateIsBoolean, ValidateIsNumber, ValidateIsString } from "src/generator/dependency/classvalidator"

export enum columnType {
  CHAR = 'CHAR',
  VARCHAR = 'VARCHAR',
  TEXT = 'TEXT',
  BOOLEAN = 'BOOLEAN',
  TINYINT = 'TINYINT',
  INTEGER = 'INTEGER',
  BIGINT = 'BIGINT',
  FLOAT = 'FLOAT',
  DOUBLE = 'DOUBLE',
  DATE = 'DATE',
  TIME = 'TIME',
  TIMESTAMP = 'TIMESTAMP',
}

export enum RelationType {
  ONE_TO_ONE = 'ONE_TO_ONE',
  MANY_TO_ONE = 'MANY_TO_ONE',
}

export const changeColumnType = (type: columnType) : string => {
  switch (type) {
    case columnType.CHAR:
    case columnType.VARCHAR:
    case columnType.TEXT:
        return 'string'
    case columnType.BOOLEAN:
        return 'boolean'
    case columnType.INTEGER:
    case columnType.TINYINT:
    case columnType.BIGINT:
    case columnType.FLOAT:
    case columnType.DOUBLE:
        return 'number'
    case columnType.DATE:
    case columnType.TIME:
    case columnType.TIMESTAMP:
        return 'Date'
    default:
        throw new Error(`Unknown Type: ${type}`)
  }
}

export const changeToDataType = (type: string) => {
    switch (type) {
        case columnType.CHAR:
        case columnType.TEXT:
        case columnType.VARCHAR:
        case columnType.DATE:
        case columnType.TIME:
        case columnType.TIMESTAMP:
            return new ValidateIsString()
        case columnType.BOOLEAN:
            return new ValidateIsBoolean()
        case columnType.BIGINT:
        case columnType.DOUBLE:
        case columnType.FLOAT:
        case columnType.INTEGER:
        case columnType.TINYINT:
            return new ValidateIsNumber()
        default:
            console.warn('Unknown Type', type)
            return new ValidateIsString()
    }
}