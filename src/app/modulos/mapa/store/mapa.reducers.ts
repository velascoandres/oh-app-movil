import {Action, createReducer, on} from '@ngrx/store';
import {MapaState} from './mapa.state';
import {MAPA_ACCIONES} from './mapa.actions';


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
    on(
        MAPA_ACCIONES.almacenarInformacion,
        (state: MapaState, {puntos, poligonos, rutas}) => {
            const nuevosPuntos = puntos && puntos.length ? puntos : state.puntos;
            const nuevasRutas = rutas && rutas.length ? rutas : state.rutas;
            const nuevosPoligonos = poligonos && poligonos.length ? poligonos : state.poligonos;
            return {
                ...state,
                puntos: nuevosPuntos,
                poligonos: nuevosPoligonos,
                rutas: nuevasRutas,
            };
        }
    ),
);

export function mapaReducer(state: MapaState | undefined, action: Action) {
    return _mapaReducer(state, action);
}
