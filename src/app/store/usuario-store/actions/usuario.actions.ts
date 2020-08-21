import {createAction, props} from '@ngrx/store';
import {PerfilUsuarioInterface} from 'src/app/interfaces/perfil-usuario.interface';


export class UsuarioActions {

    static cargarUsuario = createAction(
        '[Usuario] cargar usuario',
        props<{ parametros: Partial<PerfilUsuarioInterface> }>()
    );

    static cargarUsuarioExito = createAction(
        '[Usuario] cargar usuario exito',
        props<{ usuario: PerfilUsuarioInterface }>()
    );

    static cargarUsuarioError = createAction(
        '[Usuario] cargar usuario Error',
        props<{ error: any }>()
    );
}
