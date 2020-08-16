import { MenuInmuebleState } from '../menu-inmueble.state';
import { createReducer, on, Action } from '@ngrx/store';
import { InmueblesActions } from '../actions/menu-inmueble.actions';

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
        (estado: MenuInmuebleState, { parametros }) => {
            return {
                ...estado,
                ...parametros,
                cargando: true,
            };
        }
    ),
    on(
        InmueblesActions.cargarInmueblesExito,
        (estado: MenuInmuebleState, { inmuebles }) => {
            return {
                ...estado,
                inmuebles: [...inmuebles],
                cargando: false,
                cargo: true,
            };
        },
    ),
    on(
        InmueblesActions.cargarInmueblesError,
        (estado: MenuInmuebleState, { error }) => {
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

