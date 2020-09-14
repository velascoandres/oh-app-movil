import {Injectable} from '@angular/core';
import Map from 'ol/Map';
import {Feature, Geolocation, View} from 'ol';
import {Fill, Stroke, Style} from 'ol/style';
import CircleStyle from 'ol/style/Circle';

@Injectable({
    providedIn: 'root'
})
export class MapaService {

    constructor() {
    }

    dibujarPuntos(mapa: Map, puntos: Coordinates[]) {
        return mapa;
    }

    establecerGeolocalizacion(vista: View): Geolocation {
        return new Geolocation({
                // enableHighAccuracy must be set to true to have the heading value.
                trackingOptions: {
                    enableHighAccuracy: true,
                },
                projection: vista.getProjection(),
            },
        );
    }

    obtenerCaracteristicaPosicion(): Feature {
        const caracterisciaPosicion = new Feature();
        caracterisciaPosicion.setStyle(
            new Style({
                image: new CircleStyle({
                    radius: 6,
                    fill: new Fill({
                        color: '#3399CC',
                    }),
                    stroke: new Stroke({
                        color: '#fff',
                        width: 2,
                    }),
                }),
            })
        );
        return caracterisciaPosicion;
    }
}
