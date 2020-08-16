import { createAction, props } from '@ngrx/store';
import { UsuarioInterface } from 'src/app/interfaces/usuario.interface';


export class UsuarioActions {

    static cargarUsuario = createAction(
        '[Usuario] cargar usuario',
        props<{ parametros: Partial<UsuarioInterface> }>()
    );

    static cargarUsuarioExito = createAction(
        '[Usuario] cargar usuario exito',
        props<{ usuario: UsuarioInterface }>()
    );

    static cargarUsuarioError = createAction(
        '[Usuario] cargar usuario Error',
        props<{ error: any }>()
    );
}