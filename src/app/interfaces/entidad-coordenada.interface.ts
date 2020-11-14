export interface EntidadCoordenadaInterface {
    id?: any;
    entidad: string;
    entidadId: number;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
}
