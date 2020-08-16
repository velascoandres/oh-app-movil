import { createReducer, on, Action } from '@ngrx/store';
import { FavoritosActions } from './favoritos.actions';
import { FavoritosState } from './favoritos.state';

export const estadoInicialInmueblesFavoritos: FavoritosState = {
    cargando: false,
    cargo: false,
    error: null,
    inmuebles: [],
};

const _inmueblesFavoritosReducer = createReducer(
    estadoInicialInmueblesFavoritos,
    on(
        FavoritosActions.cargarInmueblesFavoritos,
        (estado: FavoritosState, { parametros }) => {
            return {
                ...estado,
                ...parametros,
                cargando: true,
            };
        }
    ),
    on(
        FavoritosActions.cargarInmueblesFavoritosExito,
        (estado: FavoritosState, { inmuebles }) => {
            return {
                ...estado,
                inmuebles: [...inmuebles],
                cargando: false,
                cargo: true,
            };
        },
    ),
    on(
        FavoritosActions.cargarInmueblesFavoritosError,
        (estado: FavoritosState, { error }) => {
            return {
                ...estado,
                cargando: false,
                cargo: false,
                error,
            };
        }
    ),
);


export function inmueblesFavoritosReducer(state: FavoritosState | undefined, action: Action) {
    return _inmueblesFavoritosReducer(state, action);
}

