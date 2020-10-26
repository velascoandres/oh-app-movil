export interface EntidadCoordenadaInterface {
    id?: any;
    entidad: string;
    entidadId: number;
    tipo: 'Point';
    coordenadas: [number, number];
}
