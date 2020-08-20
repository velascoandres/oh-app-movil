import { createReducer, on, Action } from '@ngrx/store';
import { FiltroState } from '../filtro.state';
import { FiltroActions } from '../actions/filtro.actions';

export const estadoInicialFiltro: FiltroState = {
    filtrando: false,
    query: {},
};

const _filtroReducer = createReducer(
    estadoInicialFiltro,
    on(
        FiltroActions.emitirFiltro,
        (estado: FiltroState, { query }) => {
            return {
                ...estado,
                query,
            };
        }
    ),
    on(
        FiltroActions.mostrarFiltros,
        (estado) => {
            return {
                ...estado,
                filtrando: !estado.filtrando,
            };
        }
    ),
);


export function filtroReducer(state: FiltroState | undefined, action: Action) {
    return _filtroReducer(state, action);
}

