import {Component, Input, OnInit} from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import {MapaService} from '../../servicios/mapa.service';
import {Collection, Feature, Geolocation} from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Geometry, Point} from 'ol/geom';
import {Coordinate} from 'ol/coordinate';
import XYZ from 'ol/source/XYZ';
import {MapaAppState} from '../../store/mapa.store';
import {Store} from '@ngrx/store';
import {Draw, Interaction, Modify, Select, Snap} from 'ol/interaction';
import {Fill, Icon, Stroke, Style} from 'ol/style';
import GeometryType from 'ol/geom/GeometryType';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {MAPA_ACCIONES} from '../../store/mapa.actions';
import {MAPA_HELPER, transformarCoordenasMapa} from '../../helpers/mapa-helpers';
import {take} from 'rxjs/operators';


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

    feautureCargada: Feature;

    constructor(
        private readonly mapaService: MapaService,
        private readonly mapaStore: Store<MapaAppState>,
    ) {
        this.dibujarSoloUnaFigura = true;
    }

    ngOnInit() {
        this.inicializarMapa();
        this.escucharMapaStore();
    }

    inicializarMapa(
        caracteristicas?: Feature<Geometry>[] | Collection<Feature<Geometry>>,
    ) {
        console.log('me inicialize');
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
        this.establecerInteraccionModificar(caracteristicas);
        // // Esta ultima funcion usarla en otra funcion para delegar que "forma" dibujar
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
            .pipe(take(2))
            .subscribe(
                ({puntos}) => {
                    if (!this.mapa) {
                        this.inicializarMapa();
                    }
                    if (puntos && puntos.length) {
                        this.lienzo.clear();
                        const puntosTransformados = transformarCoordenasMapa(puntos[0]);
                        this.lienzo.addFeature(
                            new Feature<Geometry>(
                                new Point(
                                    transformarCoordenasMapa(puntos[0]),
                                ),
                            ),
                        );
                        this.vista.setCenter(puntosTransformados);
                        this.mapa.removeInteraction(this.dibujarInteraccion);
                    }
                }
            );
    }

    establecerInteraccionModificar(caracteristicas?: Feature<Geometry>[] | Collection<Feature<Geometry>>,
    ) {
        if (caracteristicas) {
            this.lienzo = new VectorSource(
                {
                    features: caracteristicas,
                }
            );
        } else {
            this.lienzo = new VectorSource();
        }
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
                },
            ),
        });
        const select = new Select({});
        this.modificarInteraccion = new Modify(
            {
                source: this.lienzo,
            }
        );
        this.mapa.addInteraction(this.modificarInteraccion);
        this.mapa.addInteraction(select);
        this.mapa.addLayer(this.modificarVector);
    }

    agregarInteractionesParaDibujar(tipo: GeometryType = GeometryType.POINT) {
        this.dibujarInteraccion = new Draw({
            source: this.lienzo,
            type: tipo,
        });
        this.mapa.addInteraction(this.dibujarInteraccion);
        this.snapInteraccion = new Snap({source: this.lienzo});
        this.snapInteraccion = new Modify({source: this.lienzo});
        this.mapa.addInteraction(this.snapInteraccion);
        // this.snapInteraccion.on(
        //     'modifyend', (e: any) => {
        //         // const coordenadas = MAPA_HELPER.obtenerCoordenasDesdeEvento(e);
        //
        //         const co = (e.features.getArray() as any[])[0].getGeometry().flatCoordinates;
        //         console.log(transformarCoordenas(co));
        //     },
        // );
        this.snapInteraccion.on(
            'modifyend', (event: any) => {
                // Emitir coordenadas al store
                const coordenadas = MAPA_HELPER.obtenerCoordenasDesdeEvento(event, 'modifyend');
                this.mapaStore.dispatch(
                    MAPA_ACCIONES.almacenarInformacion(
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
                    MAPA_ACCIONES.almacenarInformacion(
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
