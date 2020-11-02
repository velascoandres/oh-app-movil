import * as olProj from 'ol/proj';


export function transformarCoordenas(coordinate: number[]): number[] {
    return olProj
        .transform(coordinate, 'EPSG:3857', 'EPSG:4326').reverse() as [number, number];
}

export function transformarCoordenasMapa(coordinate: number[]): number[] {
    return olProj
        .transform(coordinate,  'EPSG:4326', 'EPSG:3857') as [number, number];
}

function obtenerCoordenasDesdeEvento(evento, tipo: string = 'drawend', transformar: boolean = true): number[] {
    let coordenadas: number[] = [];
    switch (tipo) {
        case 'drawend':
            coordenadas = evento.feature.getGeometry().flatCoordinates;
            break;
        case 'modifyend':
            coordenadas = evento.features.getArray()[0].getGeometry().flatCoordinates;

            break;
    }
    return transformar ? transformarCoordenas(coordenadas) : coordenadas;
}


export const MAPA_HELPER = {
    transformarCoordenas,
    obtenerCoordenasDesdeEvento,
};
