import { createAction, props } from '@ngrx/store';
import { FiltroState } from '../filtro.state';


export class FiltroActions {

    static emitirFiltro = createAction(
        '[Filtro] emitir Filtro',
        props<{query: any}>()
    );

    static mostrarFiltros = createAction(
        '[Filtro] emitir Filtro',
    );
}
