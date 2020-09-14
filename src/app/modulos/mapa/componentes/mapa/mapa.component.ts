import {Component, OnInit} from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import {MapaService} from '../../servicios/mapa.service';
import {Feature, Geolocation, Tile} from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Point} from 'ol/geom';
import {Coordinate} from 'ol/coordinate';
import XYZ from 'ol/source/XYZ';


@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

    mapa: Map;
    geolocalizacion: Geolocation;
    caracteristicaPosicion: Feature;
    vista: View;
    coordenadasActuales: Coordinate = [7.0785, 51.4614];
    source: XYZ;
    cargoMapa: boolean;

    constructor(
        private readonly mapaService: MapaService,
    ) {
    }

    ngOnInit() {
        this.inicializarMapa();
    }

    inicializarMapa() {
        this.source = new OSM();
        this.vista = new View(
            {
                center: olProj.fromLonLat(this.coordenadasActuales),
                zoom: 15,
            },
        );
        this.mapa = new Map(
            {
                target: 'mapa_contenedor',
                layers: [
                    new TileLayer(
                        {
                            source: this.source,
                        },
                    ),
                ],
                view: this.vista,
            },
        );
        this.mapa.once(
            'postrender',
            () => {
                this.cargoMapa = true;
            }
        );
        this.establecerGeolocalizacion();
        this.mapa.setSize([1000, 1000]);
    }

    establecerGeolocalizacion() {
        this.geolocalizacion = this.mapaService.establecerGeolocalizacion(this.vista);
        this.caracteristicaPosicion = this.mapaService.obtenerCaracteristicaPosicion();
        const capaLocalizacion = new VectorLayer({
                source: new VectorSource({
                        features: [this.caracteristicaPosicion],
                    },
                ),
            },
        );
        this.mapa.addLayer(capaLocalizacion);
        this.geolocalizacion.setTracking(true);
        this.geolocalizacion.on('change:position', () => {
                this.coordenadasActuales = this.geolocalizacion.getPosition();
                this.caracteristicaPosicion.setGeometry(this.coordenadasActuales ? new Point(this.coordenadasActuales) : null);
                this.vista.setCenter(this.coordenadasActuales);
            },
        );
    }

    centrarMapa() {
        this.vista.setCenter(this.coordenadasActuales);
    }
}
