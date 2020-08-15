export interface Inmueble{
    id?: number;
    nombre: string;
    descripcion: string;
    habilitado: 0 | 1;
    precio: number;
    pisos: number;
    parqueaderos: number;
    imagenes: string[];
    categoria: any;
    esAlquiler: 0 | 1;
    perfilUsuario: any;
}