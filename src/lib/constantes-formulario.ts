import {Validators} from '@angular/forms';
export const VALIDACION_LETRAS = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),
    Validators.pattern('[A-Za-z]+'),
];
export const VALIDACION_CAMPO_GENERICO = [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(50),
];

export const VALIDACION_SELECT = [
    Validators.required,
];

export const VALIDACION_NUMERO_TELEFONO = [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern('[0-9]+')
];

export const VALIDACION_CEDULA = [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern('[0-9]+'),
];
