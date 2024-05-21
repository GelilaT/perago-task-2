import { decoratorTemplate } from "./common.template";
import { importable } from "./types";

export class ValidateIsString implements importable{
    name ='IsString'
    module = 'class-validator'
    dependency = [];

    getCode(): string{
        return decoratorTemplate({ name: this.name, params: [] })
    }
} 

export class ValidateIsBoolean implements importable{
    name = 'IsBoolean'
    module = 'class-validator'
    dependency = [];

    getCode(): string{
        return decoratorTemplate({ name: this.name, params: [] })
    }
}

export class ValidateIsNumber implements importable{
    name = 'IsNumber'
    module = 'class-validator'
    dependency = [];

    getCode(): string{
        return decoratorTemplate({ name: this.name, params: [] })
    }
}

export class ValidateIsOptional implements importable{
    name = 'IsOptional'
    module = 'class-validator'
    dependency = [];

    getCode(): string{
        return decoratorTemplate({ name: this.name, params: [] })
    }
}