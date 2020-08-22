export interface InmuebleInterface{
    id?: number;
    nombre: string;
    descripcion: string;
    habilitado: 0 | 1;
    precio: number;
    plantas: number;
    parqueaderos: number;
    imagenes: any[];
    categoria: any;
    esAlquiler: 0 | 1;
    perfilUsuario: any;
    habitaciones: number;
    direccion: string;
}
