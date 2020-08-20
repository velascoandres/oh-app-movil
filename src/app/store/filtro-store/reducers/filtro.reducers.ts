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
            const nuevoEstado = {
                ...estado,
                query,
            };
            console.log(nuevoEstado);
            return nuevoEstado;
        }
    ),
    on(
        FiltroActions.mostrarFiltros,
        (estado) => {
            const nuevoEstado = {
                ...estado,
                filtrando: !estado.filtrando,
            };
            return nuevoEstado;
        }
    ),
);


export function filtroReducer(state: FiltroState | undefined, action: Action) {
    return _filtroReducer(state, action);
}

