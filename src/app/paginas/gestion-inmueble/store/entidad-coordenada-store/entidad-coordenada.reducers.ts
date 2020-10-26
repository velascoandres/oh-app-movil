import {Action, createReducer, on} from '@ngrx/store';
import {EntidadCoordenadaState} from './entidad-coordenada.state';
import {entidadCoordenadaAdapter} from './entidad-coordenada.adapter';
import {ENTIDAD_COORD_ACCIONES} from './entidad-coordenada.actions';


export const initialEntidadCoordenadaState: EntidadCoordenadaState = entidadCoordenadaAdapter.getInitialState(
    {
        cargando: false,
        error: undefined,
    }
);

const _entidadCoordenadaReducer = createReducer(
    initialEntidadCoordenadaState,
    on(ENTIDAD_COORD_ACCIONES.cargarCoordenada,
        (state: EntidadCoordenadaState, {consulta}) => {
            return {
                ...state,
                cargando: true,
            };
        },
    ),
    on(ENTIDAD_COORD_ACCIONES.cargarCoordenadaExito,
        (state: EntidadCoordenadaState, {entidadesCoord}) => {
            return entidadCoordenadaAdapter.addMany(
                entidadesCoord,
                {...state, cargando: false, error: undefined},
            );
        },
    ),
    on(ENTIDAD_COORD_ACCIONES.guardarCoordenada,
        (state: EntidadCoordenadaState, {entidadCooordenada}) => {
            return {
                ...state,
                cargando: true,
            };
        },
    ),
    on(ENTIDAD_COORD_ACCIONES.guardarCoordenadaExito,
        (state: EntidadCoordenadaState, {entidadCooordenada}) => {
            return entidadCoordenadaAdapter.addOne(
                entidadCooordenada,
                {
                    ...state,
                    cargando: false,
                    error: undefined,
                },
            );
        },
    ),
    on(ENTIDAD_COORD_ACCIONES.editarCoordenada,
        (state: EntidadCoordenadaState, {entidadCooordenada}) => {
            return {
                ...state,
                cargando: true,
            };
        },
    ),
    on(ENTIDAD_COORD_ACCIONES.editarCoordenadaExito,
        (state: EntidadCoordenadaState, {entidadCooordenada}) => {
            return entidadCoordenadaAdapter.updateOne(
                {
                    id: entidadCooordenada.id,
                    changes: entidadCooordenada,
                },
                {
                    ...state,
                    cargando: false,
                    error: undefined,
                },
            );
        },
    ),
    on(ENTIDAD_COORD_ACCIONES.errorOperacion,
        (state: EntidadCoordenadaState, {error}) => {
            return {
                ...state,
                error,
                cargando: false,
            };
        },
    ),
);

export function entidadCoordenadaReducer(state: EntidadCoordenadaState | undefined, action: Action) {
    return _entidadCoordenadaReducer(state, action);
}
