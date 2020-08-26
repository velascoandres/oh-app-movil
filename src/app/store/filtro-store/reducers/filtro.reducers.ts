import {Action, createReducer, on} from '@ngrx/store';
import {FiltroState} from '../filtro.state';
import {FiltroActions} from '../actions/filtro.actions';

export const estadoInicialFiltro: FiltroState = {
    mostrandoFiltros: false,
    query: {},
    emitioFiltros: false,
};

const _filtroReducer = createReducer(
    estadoInicialFiltro,
    on(
        FiltroActions.emitirFiltro,
        (estado: FiltroState, {query}) => {
            return {
                query,
                mostrandoFiltros: false,
                emitioFiltros: true,
            };
        }
    ),
    on(
        FiltroActions.mostrarFiltros,
        (estado: FiltroState, {limpiarFiltros}) => {
            return {
                ...estado,
                mostrandoFiltros: !estado.mostrandoFiltros,
                query: limpiarFiltros ? {} : estado.query,
                emitioFiltros: false,
            };
        }
    ),
    on(
        FiltroActions.encerarFiltro,
        (estado: FiltroState) => estadoInicialFiltro,
    ),
);


export function filtroReducer(state: FiltroState | undefined, action: Action) {
    return _filtroReducer(state, action);
}

