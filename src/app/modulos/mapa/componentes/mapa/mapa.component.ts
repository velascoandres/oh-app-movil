import {Component, Input, OnInit} from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import {MapaService} from '../../servicios/mapa.service';
import {Feature, Geolocation} from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Point} from 'ol/geom';
import {Coordinate} from 'ol/coordinate';
import XYZ from 'ol/source/XYZ';
import {MapaAppState} from '../../store/mapa.store';
import {Store} from '@ngrx/store';
import {Draw, Interaction, Modify} from 'ol/interaction';
import {Fill, Icon, Stroke, Style} from 'ol/style';
import GeometryType from 'ol/geom/GeometryType';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import CircleStyle from 'ol/style/Circle';
import {MapaAcciones} from '../../store/mapa.actions';
import {MAPA_HELPER} from '../../helpers/mapa-helpers';


@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {


    @Input()
    dibujarSoloUnaFigura = true;
    mapa: Map;
    geolocalizacion: Geolocation;
    caracteristicaPosicion: Feature;
    vista: View;
    coordenadasActuales: Coordinate = [7.0785, 51.4614];
    source: XYZ;
    cargoMapa: boolean;
    modificarInteraccion: any;
    modificarVector: VectorLayer;
    dibujarInteraccion: Interaction;
    snapInteraccion: any;
    lienzo: VectorSource;

    constructor(
        private readonly mapaService: MapaService,
        private readonly mapaStore: Store<MapaAppState>,
    ) {
        this.dibujarSoloUnaFigura = true;
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
        this.mapa.setSize([1000, 1000]);
        this.establecerInteraccionModificar();
        // Esta ultima funcion usarla en otra funcion para delegar que "forma" dibujar
        this.agregarInteractionesParaDibujar();
        this.establecerGeolocalizacion();
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

    escucharMapaStore() {
        this.mapaStore
            .select('mapa')
            .subscribe(
                ({poligonos, rutas, puntos}) => {
                    if (puntos) {
                        // dibujar puntos
                    }
                    if (poligonos) {
                        // dibujar poligonos
                    }
                    if (rutas) {
                        // dibujar rutas
                    }
                }
            );
    }

    establecerInteraccionModificar() {
        this.lienzo = new VectorSource();
        this.modificarVector = new VectorLayer({
            source: this.lienzo,
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
            }),
        });
        this.modificarInteraccion = new Modify(
            {
                source: this.lienzo,
                style: new Style(
                    {
                        image: new CircleStyle(
                            {
                                radius: 0,
                                stroke: new Stroke(
                                    {
                                        color: 'rgba(255,255,255,0.9)'
                                    }
                                ),
                            }
                        )
                    }
                )
            }
        );
        this.mapa.addInteraction(this.modificarInteraccion);
        this.mapa.addLayer(this.modificarVector);
    }

    agregarInteractionesParaDibujar(tipo: GeometryType = GeometryType.POINT) {
        this.dibujarInteraccion = new Draw({
            source: this.lienzo,
            type: tipo,
        });
        this.mapa.addInteraction(this.dibujarInteraccion);
        // this.snapInteraccion = new Snap({source: this.lienzo});
        this.snapInteraccion = new Modify({source: this.lienzo});
        this.mapa.addInteraction(this.snapInteraccion);
        this.snapInteraccion.on(
            'modifyend', (event: any) => {
                // Emitir coordenadas al store
                const coordenadas = MAPA_HELPER.obtenerCoordenasDesdeEvento(event, 'modifyend');
                this.mapaStore.dispatch(
                    MapaAcciones.almacenarInformacion(
                        {
                            puntos: [coordenadas],
                        },
                    )
                );
            }
        );
        this.dibujarInteraccion.on(
            'drawend',
            (evento: any) => {
                const coordenadas = MAPA_HELPER.obtenerCoordenasDesdeEvento(evento);
                // Emitir coordenadas al store
                this.mapaStore.dispatch(
                    MapaAcciones.almacenarInformacion(
                        {
                            puntos: [coordenadas],
                        },
                    )
                );
                if (this.dibujarSoloUnaFigura) {
                    this.mapa.removeInteraction(this.dibujarInteraccion);
                }
            }
        );
    }

    deshacerCambios() {
        const caracteristicas = this.lienzo.getFeatures();
        if (caracteristicas.length) {
            const posicion = caracteristicas.length - 1;
            const ultimaCaracteristica = caracteristicas[posicion];
            if (posicion === 0) {
                this.agregarInteractionesParaDibujar();
            }
            this.lienzo.removeFeature(ultimaCaracteristica);
        }
    }
}
