import {InmuebleInterface} from 'src/app/interfaces/inmueble.interface';

export interface MenuInmuebleState {
    cargo: boolean;
    cargando: boolean;
    error: any;
    inmuebles?: InmuebleInterface[];
    total?: number;
    queryActual?: any;
    filtro?: boolean;
    sonDelUsuario?: boolean;
}
