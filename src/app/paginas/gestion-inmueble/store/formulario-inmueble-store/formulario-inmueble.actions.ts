import {createAction, props} from '@ngrx/store';
import {InmuebleFormulario, InmuebleInterface} from '../../../../interfaces/inmueble.interface';

export class FormularioInmuebleActions {
    static llenarFormulario = createAction(
        '[Formulario Inmueble] Llenar Formulario ',
        props<{ inmueble: InmuebleInterface }>(),
    );

    static emitirInmueble = createAction(
        '[Formulario Inmueble] Emitir informacion',
        props<{ inmueble: InmuebleFormulario }>(),
    );

    static vaciarFormulario = createAction(
        '[Formulario Inmueble] Vaciar Formulario',
    );
}
