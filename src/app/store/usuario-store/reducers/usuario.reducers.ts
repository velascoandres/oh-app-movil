import { UsuarioState } from '../usuario.state';
import { createReducer, on, Action } from '@ngrx/store';
import { UsuarioActions } from '../actions/usuario.actions';

export const estadoInicialUsuario: UsuarioState = {
    cargando: false,
    cargo: false,
    error: null,
    perfilUsuario: null,
    correo: null,
};

const _usuarioReducer = createReducer(
    estadoInicialUsuario,
    on(
        UsuarioActions.cargarUsuario,
        (estado: UsuarioState, { parametros }) => {
            return {
                ...estado,
                ...parametros,
                cargando: true,
            };
        }
    ),
    on(
        UsuarioActions.cargarUsuarioExito,
        (estado: UsuarioState, { usuario }) => {
            return {
                ...estado,
                ...usuario,
                cargando: false,
                cargo: true,
            };
        }
    ),
    on(
        UsuarioActions.cargarUsuarioError,
        (estado: UsuarioState, { error }) => {
            return {
                ...estado,
                cargando: false,
                cargo: false,
                error,
            };
        }
    ),
);


export function usuarioReducer(state: UsuarioState | undefined, action: Action) {
    return _usuarioReducer(state, action);
}

