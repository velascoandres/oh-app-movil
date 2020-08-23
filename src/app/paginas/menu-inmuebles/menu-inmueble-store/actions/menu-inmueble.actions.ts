import { createAction, props } from '@ngrx/store';
import { InmuebleInterface } from 'src/app/interfaces/inmueble.interface';

export class InmueblesActions {
    static cargarInmuebles = createAction(
        '[Inmuebles] cargar inmuebles',
        props<{ parametros: {[k in string]: any}, filtro?: boolean, sonDelUsuario?: boolean }>()
    );

    static cargarInmueblesExito = createAction(
        '[Inmuebles] cargar inmuebles exito',
        props<{ inmuebles: InmuebleInterface[], total: number, nextQuery: any, filtro?: boolean, sonDelUsuario?: boolean }>()
    );

    static cargarInmueblesError = createAction(
        '[Inmuebles] cargar inmuebles Error',
        props<{ error: any }>()
    );
}
