import {PerfilUsuarioInterface} from 'src/app/interfaces/perfil-usuario.interface';

export interface UsuarioState {
    cargo: boolean;
    cargando: boolean;
    error: any;
    usuario: PerfilUsuarioInterface;
}


