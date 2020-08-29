import {InmuebleInterface} from './inmueble.interface';

export interface ImagenInmuebleInterface {
    id?: number;
    url: string;
    inmueble?: number | InmuebleInterface;
}
