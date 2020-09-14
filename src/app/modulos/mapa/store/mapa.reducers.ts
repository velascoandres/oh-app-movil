import {Action, createReducer} from '@ngrx/store';
import {MapaState} from './mapa.state';


export const initialMapaState: MapaState = {
    estaVacio: true,
    informacionSeleccionada: undefined,
    modoEdicion: false,
    poligonos: [],
    puntos: [],
    rutas: [],
    error: undefined,
};

const _mapaReducer = createReducer(
    initialMapaState,
    //  on(someAction, (state: MapaState, {}) => ())
);

export function mapaReducer(state: MapaState | undefined, action: Action) {
    return _mapaReducer(state, action);
}
