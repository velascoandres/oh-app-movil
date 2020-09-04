import {PrecioInterface} from './precio.interface';

export interface InmuebleInterface {
    id?: number;
    nombre: string;
    descripcion: string;
    habilitado: 0 | 1;
    precio?: PrecioInterface;
    predio: number;
    plantas: number;
    parqueaderos: number;
    imagenes: any[];
    categoria: any;
    enAlquiler: 0 | 1;
    perfilUsuario: any;
    habitaciones: number;
    direccion: string;
}

export interface InmuebleFormulario {
    id?: number;
    nombre: string;
    descripcion: string;
    habilitado: 0 | 1;
    precio: number;
    predio: number;
    plantas: number;
    parqueaderos: number;
    imagenes: any[];
    categoria: any;
    enAlquiler: 0 | 1;
    perfilUsuario: any;
    habitaciones: number;
    direccion: string;
    tipoMoneda: number;
}
