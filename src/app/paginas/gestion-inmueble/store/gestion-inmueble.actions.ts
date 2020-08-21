import {createAction, props} from '@ngrx/store';
import {InmuebleInterface} from '../../../interfaces/inmueble.interface';

export class GestionInmuebleActions {

    static cargarInmueblesGestion = createAction(
        '[Gestion Inmueble] Cargar Inmuebles',
        props<{
            parametros: {},
            filtro: boolean,
        }>()
    );

    static cargarInmueblesGestionExito = createAction(
        '[Gestion Inmueble] Cargar Inmuebles',
        props<{
            inmuebles: InmuebleInterface[], total: number, nextQuery: any, filtro?: boolean
        }>()
    );

    static cargarInmueblesGestionError = createAction(
        '[Gestion Inmueble] Cargar Inmuebles',
        props<{ error: any }>()
    );
}

