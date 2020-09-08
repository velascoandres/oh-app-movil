import {Action, createReducer, on} from '@ngrx/store';
import {FormularioInmuebleActions} from './formulario-inmueble.actions';
import {TipoMonedaInterface} from '../../../interfaces/tipo-moneda.interface';
import {InmuebleFormulario} from '../../../interfaces/inmueble.interface';


export interface FormularioInmuebleState {
    estaValido: boolean;
    inmueble: InmuebleFormulario;
    sonEdicion: boolean;
}

export const initialFormularioInmuebleState: FormularioInmuebleState = {
    estaValido: false,
    inmueble: undefined,
    sonEdicion: false,
};

const _formularioInmuebleReducer = createReducer(
    initialFormularioInmuebleState,
    on(
        FormularioInmuebleActions.llenarFormulario,
        (state: FormularioInmuebleState, {inmueble}) => {
            // Realizar el casteo
            const inmuebleCasteado: InmuebleFormulario = {
                ...inmueble,
                precio: 23,
                tipoMoneda: (inmueble.precio.tipoMoneda as TipoMonedaInterface).id,
            };
            return {
                estaValido: false,
                inmueble: inmuebleCasteado,
                sonEdicion: true,
            };
        },
    ),
    on(
        FormularioInmuebleActions.emitirInmueble,
        (state: FormularioInmuebleState, {inmueble}) => {
            // Realizar el casteo
            return {
                estaValido: true,
                inmueble,
                sonEdicion: false,
            };
        },
    ),
    on(
        FormularioInmuebleActions.vaciarFormulario,
        (state: FormularioInmuebleState) => {
            return {
                estaValido: false,
                inmueble: undefined,
                sonEdicion: false,
            };
        },
    ),
);

export function formularioInmuebleReducer(state: FormularioInmuebleState | undefined, action: Action) {
    return _formularioInmuebleReducer(state, action);
}
