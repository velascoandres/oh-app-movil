import { createAction, props } from '@ngrx/store';
import { FiltroState } from '../filtro.state';


export class FiltroActions {

    static emitirFiltro = createAction(
        '[Filtro] mostrar Filtro',
        props<{query: any}>()
    );

    static mostrarFiltros = createAction(
        '[Filtro] emitir Filtro',
    );
}
