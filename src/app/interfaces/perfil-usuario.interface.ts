import {InmuebleInterface} from './inmueble.interface';

export interface PerfilUsuarioInterface {
    id?: number;
    correo: string;
    inmuebles?: InmuebleInterface[];
    favoritos?: any;
}
