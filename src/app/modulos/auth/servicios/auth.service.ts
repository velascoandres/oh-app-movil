import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { UsuarioActions } from 'src/app/store/usuario-store/actions/usuario.actions';
import { UsuarioInterface } from 'src/app/interfaces/usuario.interface';

@Injectable()
export class AuthService {

    usuarioActual: UsuarioInterface = {
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
