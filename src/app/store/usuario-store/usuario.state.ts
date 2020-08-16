import { UsuarioInterface } from 'src/app/interfaces/usuario.interface';

export interface UsuarioState extends UsuarioInterface{
    cargo: boolean;
    cargando: boolean;
    error: any;
}


