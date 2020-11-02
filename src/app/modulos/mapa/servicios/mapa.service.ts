import {Injectable} from '@angular/core';
import Map from 'ol/Map';
import {Feature, Geolocation, View} from 'ol';
import {Fill, Icon, Stroke, Style} from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import Point from 'ol/geom/Point';
import {Vector} from 'ol/layer';
import {format} from 'ol/coordinate';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {Source} from 'ol/source';
import VectorSource from 'ol/source/Vector';

@Injectable({
    providedIn: 'root'
})
export class MapaService {

    constructor() {
    }

    // dibujarPuntos(mapa: Map, puntos: any[]) {
    //     const punto = new Point(
    //         puntos,
    //     );
    //     return mapa;
    // }

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

    dibujarPuntos(mapa, source, vector, arregloDePoligonos: number[][]) {
        mapa.removeLayer(vector);
        const features = arregloDePoligonos.map(
            punto => new Feature(
                new Point(
                    punto,
                ),
            ),
        );
        source = new VectorSource(
            {
                features,
            }
        );
        vector = new Vector({
            source,
            style: new Style({
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                    }),
                    stroke: new Stroke({
                        color: '#ffcc33',
                        width: 2,
                    }),
                    image: new Icon({
                        anchor: [0.5, 200],
                        src: 'assets/icon/casita.svg',
                        anchorXUnits: IconAnchorUnits.FRACTION,
                        anchorYUnits: IconAnchorUnits.PIXELS,
                        scale: 0.09,
                        opacity: 0.96,
                    }),
                },
            ),
        });
        mapa.addLayer(vector);
        return mapa;
    }


}
