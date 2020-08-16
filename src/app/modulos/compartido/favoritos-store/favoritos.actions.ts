import { createAction, props } from '@ngrx/store';
import { InmuebleInterface } from 'src/app/interfaces/inmueble.interface';

export class FavoritosActions {
    static cargarInmueblesFavoritos = createAction(
        '[Favoritos] cargar inmuebles favoritos',
        props<{ parametros: { [k in string]: any } }>()
    );

    static cargarInmueblesFavoritosExito = createAction(
        '[Favoritos] cargar inmuebles favoritos exito',
        props<{ inmuebles: InmuebleInterface[], total: number }>()
    );

    static cargarInmueblesFavoritosError = createAction(
        '[Favoritos] cargar inmuebles favoritos Error',
        props<{ error: any }>()
    );
}