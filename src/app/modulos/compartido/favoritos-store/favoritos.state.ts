import { InmuebleInterface } from 'src/app/interfaces/inmueble.interface';

export interface FavoritosState {
    cargo: boolean;
    cargando: boolean;
    error: any;
    inmuebles?: InmuebleInterface[];
}