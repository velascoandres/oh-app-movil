import {Component, OnDestroy, OnInit} from '@angular/core';
import {EntidadCoordenadaRestService} from '../../../../modulos/compartido/servicios/rest/entidad-coordenada-rest.service';
import {MapaAppState} from '../../../../modulos/mapa/store/mapa.store';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {EntidadCoordenadaInterface} from '../../../../interfaces/entidad-coordenada.interface';
import {ActivatedRoute} from '@angular/router';
import {withLatestFrom} from 'rxjs/operators';
import {EntidadCoordenadaState} from '../../store/entidad-coordenada-store/entidad-coordenada.state';
import {ENTIDAD_COORD_ACCIONES} from '../../store/entidad-coordenada-store/entidad-coordenada.actions';

@Component({
    selector: 'app-gestionar-ubicacion-geografica',
    templateUrl: './gestionar-ubicacion-geografica.component.html',
    styleUrls: ['./gestionar-ubicacion-geografica.component.scss'],
})
export class GestionarUbicacionGeograficaComponent implements OnInit, OnDestroy {
    private subscripciones: Subscription[] = [];
    private entidadCoordenadaActual: EntidadCoordenadaInterface;
    estaEditando: boolean;

    constructor(
        private readonly _entidadCooredenadaRestService: EntidadCoordenadaRestService,
        private readonly _mapaStore: Store<MapaAppState>,
        private readonly _activateRoute: ActivatedRoute,
        private readonly _entidadCoordenadaStore: Store<EntidadCoordenadaState>,
    ) {
        this.estaEditando = false;
    }

    ngOnInit() {
        this.cargarParametrosRuta();
        this.escucharMapa();
        this.escucharEntidadCoordenada();
    }

    private cargarParametrosRuta() {
        this._activateRoute
            .params
            .pipe(
                withLatestFrom(this._activateRoute.queryParams),
            )
            .subscribe(
                ([parametrosRuta, queryParams]) => {
                    const idInmueble = parametrosRuta.idInmueble;
                    const nombreInmueble = queryParams.nombre;
                    const consulta = {
                        where: {
                            entidadId: +idInmueble,
                            entidad: 'inmueble',
                        },
                    };
                    this._entidadCoordenadaStore.dispatch(
                        ENTIDAD_COORD_ACCIONES.cargarCoordenada(
                            {
                                consulta,
                            },
                        ),
                    );
                },
            );
    }

    escucharMapa() {
        const subscripcionMapa = this._mapaStore
            .select('mapa')
            .subscribe(
                ({puntos, informacionSeleccionada}) => {
                    const puntoAGuardar: [number, number] = puntos[0] as [number, number];
                    this.entidadCoordenadaActual = {
                        tipo: 'Point',
                        coordenadas: puntoAGuardar,
                        entidad: 'inmueble',
                        entidadId: 1
                    };
                },
            );
        this.subscripciones.push(subscripcionMapa);
    }

    escucharEntidadCoordenada() {
        const subscripcionEntidadCoordenada = this._entidadCoordenadaStore
            .subscribe(
                ({ids}) => {
                    this.estaEditando = ids && ids.length > 0;
                }
            );
        this.subscripciones.push(subscripcionEntidadCoordenada);
    }

    ngOnDestroy(): void {
        this.subscripciones.forEach(sub => sub.unsubscribe());
    }

    guardarEditar() {
        // TODO: delegar la accion para invokar o guardar
        const accion = this.estaEditando ? ENTIDAD_COORD_ACCIONES.editarCoordenada : ENTIDAD_COORD_ACCIONES.guardarCoordenada;
        this._entidadCoordenadaStore.dispatch(
            accion(
                {
                    id: this.entidadCoordenadaActual.id,
                    entidadCooordenada: this.entidadCoordenadaActual
                }
            )
        );
    }
}
