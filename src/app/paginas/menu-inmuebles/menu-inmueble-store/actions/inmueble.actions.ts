import {createAction, props} from '@ngrx/store';
import {InmuebleInterface} from 'src/app/interfaces/inmueble.interface';
import {PrecioInterface} from '../../../../interfaces/precio.interface';


export class InmuebleActions {

    static cargarInmuebles = createAction(
        '[Inmueble] cargar inmuebles',
        props<{ parametros: { [k in string]: any }, filtro?: boolean, sonDelUsuario?: boolean }>()
    );

    static cargarInmueblesExito = createAction(
        '[Inmueble] cargar inmuebles exito',
        props<{ inmuebles: InmuebleInterface[], total: number, nextQuery: any, filtro?: boolean, sonDelUsuario?: boolean }>()
    );

    static cargarInmueblesError = createAction(
        '[Inmueble] cargar inmuebles Error',
        props<{ error: any }>()
    );
    static cargarInmueble = createAction(
        '[Inmueble] cargar inmueble',
        props<{ parametros: Partial<InmuebleInterface> | any }>()
    );

    static agregarFavoritos = createAction(
        '[Inmueble] abregar favoritos',
        props<{ inmueble: InmuebleInterface }>()
    );

    static deshabilitarInmueble = createAction(
        '[Inmueble] deshabilitar inmueble',
        props<{ inmueble: InmuebleInterface }>()
    );

    static deshabilitarInmuebleExito = createAction(
        '[Inmueble] deshabilitar inmueble exito',
        props<{ inmueble: InmuebleInterface }>()
    );

    static deshabilitarInmuebleError = createAction(
        '[Inmueble] deshabilitar inmueble error',
        props<{ error: any }>()
    );

    static crearInmueble = createAction(
        '[Inmueble] crear inmueble',
        props<{ inmueble: InmuebleInterface, precio: PrecioInterface }>()
    );

    static actualizarInmueble = createAction(
        '[Inmueble] actualizar inmueble',
        props<{ inmueble: InmuebleInterface }>()
    );

    static cargarInmuebleExito = createAction(
        '[Inmueble] cargar inmueble exito',
        props<{ inmueble: InmuebleInterface }>()
    );

    static cargarInmuebleError = createAction(
        '[Inmueble] cargar usuario Error',
        props<{ error: any }>()
    );

    static crearInmuebleExito = createAction(
        '[Inmueble] crear inmueble exito',
        props<{ inmueble: InmuebleInterface }>()
    );

    static crearInmuebleError = createAction(
        '[Inmueble] crear usuario Error',
        props<{ error: any }>()
    );

    static actualizarInmuebleExito = createAction(
        '[Inmueble] actualizar inmueble exito',
        props<{ inmueble: InmuebleInterface }>()
    );

    static actualizarInmuebleError = createAction(
        '[Inmueble] actualizar usuario Error',
        props<{ error: any }>()
    );

    static agregarFavoritosInmuebleExito = createAction(
        '[Inmueble] agregarFavoritos inmueble exito',
        props<{ inmueble: InmuebleInterface }>()
    );

    static agregarFavoritosInmuebleError = createAction(
        '[Inmueble] agregar favoritos usuario Error',
        props<{ error: any }>()
    );
}
