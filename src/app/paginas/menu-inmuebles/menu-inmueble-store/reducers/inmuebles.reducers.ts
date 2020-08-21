import {MenuInmuebleState} from '../menu-inmueble.state';
import {createReducer, on, Action} from '@ngrx/store';
import {InmueblesActions} from '../actions/menu-inmueble.actions';

export const estadoInicialInmuebles: MenuInmuebleState = {
    cargando: false,
    cargo: false,
    error: null,
    inmuebles: [],
};

const _inmueblesReducer = createReducer(
    estadoInicialInmuebles,
    on(
        InmueblesActions.cargarInmuebles,
        (estado: MenuInmuebleState, {parametros, filtro}) => {
            return {
                ...estado,
                queryActual: {
                    ...estado.queryActual,
                    ...parametros,
                },
                cargando: true,
                filtro,
            };
        }
    ),
    on(
        InmueblesActions.cargarInmueblesExito,
        (estado: MenuInmuebleState, {inmuebles, total, nextQuery}) => {
            let inmueblesNuevos = [];
            if (estado.filtro) {
                inmueblesNuevos = inmuebles;
            } else {
                inmueblesNuevos = [
                    ...estado.inmuebles,
                    ...inmuebles,
                ];
            }
            return {
                ...estado,
                inmuebles: [
                    ...inmueblesNuevos
                ],
                total,
                cargando: false,
                cargo: true,
            };
        },
    ),
    on(
        InmueblesActions.cargarInmueblesError,
        (estado: MenuInmuebleState, {error}) => {
            return {
                ...estado,
                cargando: false,
                cargo: false,
                error,
            };
        }
    ),
);


export function inmueblesReducer(state: MenuInmuebleState | undefined, action: Action) {
    return _inmueblesReducer(state, action);
}

