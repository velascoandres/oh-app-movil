import {Injectable} from '@angular/core';
import {Feature, Geolocation, View} from 'ol';
import {Fill, Stroke, Style} from 'ol/style';
import CircleStyle from 'ol/style/Circle';

@Injectable({
    providedIn: 'root'
})
export class MapaService {


    private _localizacion: number[] = [];

    constructor() {
    }

    get localizacion() {
        console.log(this._localizacion);
        return this._localizacion;
    }

    recuperarLocalizacion(): void {
        this.establecerLocalizacion().then(
            (position: Position) => {
                console.log(position.coords.longitude);
                this._localizacion[0] = position.coords.latitude;
                this._localizacion[1] = position.coords.longitude;
            }
        );
    }

    private establecerLocalizacion() {
        return new Promise(
            (resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position: Position) => {
                            if (position) {
                                resolve(position);
                            } else {
                                reject('error');
                            }
                        },
                        (error: PositionError) => reject(error),
                        {
                            enableHighAccuracy: false,
                            timeout: 1000,
                        }
                    );
                } else {
                    reject('error');
                }
            }
        )

    }


    establecerGeolocalizacion(vista: View): Geolocation {
        return new Geolocation({
                // enableHighAccuracy must be set to true to have the heading value.
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
