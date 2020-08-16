import { InmuebleInterface } from 'src/app/interfaces/inmueble.interface';

export interface InmuebleState extends InmuebleInterface {
    cargo: boolean;
    cargando: boolean;
    error: any;
    edito: boolean;
}
