import {Injectable} from '@angular/core';
import Map from 'ol/Map';

@Injectable({
    providedIn: 'root'
})
export class MapaService {

    constructor() {
    }

    dibujarPuntos(mapa: Map, puntos: Coordinates[]) {
        return mapa;
    }
}
