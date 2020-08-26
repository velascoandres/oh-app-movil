import {InmuebleInterface} from 'src/app/interfaces/inmueble.interface';

export interface InmuebleState {
    cargo: boolean;
    cargando: boolean;
    error: any;
    edito: boolean;
    inmuebleSeleccionado: InmuebleInterface;
    inmuebles: InmuebleInterface[];
    queryActual: any;
    total?: number;
    filtro?: boolean;
    sonDelUsuario?: boolean;
}
