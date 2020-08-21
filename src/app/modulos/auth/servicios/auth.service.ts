import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { UsuarioActions } from 'src/app/store/usuario-store/actions/usuario.actions';
import { PerfilUsuarioInterface } from 'src/app/interfaces/perfil-usuario.interface';

@Injectable()
export class AuthService {

    usuarioActual: PerfilUsuarioInterface = {
        id: 74,
        perfilUsuario: {
            id: 74,
            nombres: 'Juan',
            apellidos: 'Pecados',
        },
        correo: 'juan.pecados@gmail.com'
    };

    constructor(
        private readonly usuarioStore: Store<AppState>
    ) {
        this.usuarioStore
            .dispatch(
                UsuarioActions.cargarUsuarioExito(
                    { usuario: this.usuarioActual }
                )
            );
    }
}
