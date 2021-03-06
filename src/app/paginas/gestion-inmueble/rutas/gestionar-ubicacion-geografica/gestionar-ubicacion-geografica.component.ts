import {Component, OnDestroy, OnInit} from '@angular/core';
import {EntidadCoordenadaRestService} from '../../../../modulos/compartido/servicios/rest/entidad-coordenada-rest.service';
import {MapaAppState} from '../../../../modulos/mapa/store/mapa.store';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {EntidadCoordenadaInterface} from '../../../../interfaces/entidad-coordenada.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {withLatestFrom} from 'rxjs/operators';
import {
    AppStateEntidadCoordenada,
} from '../../store/entidad-coordenada-store/entidad-coordenada.state';
import {ENTIDAD_COORD_ACCIONES} from '../../store/entidad-coordenada-store/entidad-coordenada.actions';
import {ToastController, ViewWillEnter} from '@ionic/angular';

@Component({
    selector: 'app-gestionar-ubicacion-geografica',
    templateUrl: './gestionar-ubicacion-geografica.component.html',
    styleUrls: ['./gestionar-ubicacion-geografica.component.scss'],
})
export class GestionarUbicacionGeograficaComponent implements OnInit, OnDestroy, ViewWillEnter {
    private subscripciones: Subscription[] = [];
    private entidadCoordenadaActual: EntidadCoordenadaInterface;
    estaEditando: boolean;
    private idInmueble: number;

    constructor(
        private readonly _entidadCooredenadaRestService: EntidadCoordenadaRestService,
        private readonly _mapaStore: Store<MapaAppState>,
        private readonly _activateRoute: ActivatedRoute,
        private readonly _entidadCoordenadaStore: Store<AppStateEntidadCoordenada>,
        public toastController: ToastController,
        private readonly _router: Router,
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
                    this.idInmueble = +parametrosRuta.idInmueble;
                    const nombreInmueble = queryParams.nombre;
                    const consulta = {
                        where: {
                            entidadId: +this.idInmueble,
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
                        entidad: 'inmueble',
                        entidadId: this.idInmueble,
                        location: {
                            type: 'Point',
                            coordinates: puntoAGuardar,
                        }
                    };
                },
            );
        this.subscripciones.push(subscripcionMapa);
    }

    escucharEntidadCoordenada() {
        const subscripcionEntidadCoordenada = this._entidadCoordenadaStore
            .select('entidadCoordenada')
            .subscribe(
                ({entities, ids, registro, cargando, error}) => {
                    this.estaEditando = ids && ids.length > 0;
                    const editoExito = !cargando && !error && this.estaEditando && registro;
                    const guardoExito = !cargando && !error && !this.estaEditando && registro;
                    if (editoExito) {
                        this.mostrarToast('Información Geográfica editada con éxito!!').then();
                        this._router.navigate(['', 'tabs', 'gestion-inmueble']);
                    }
                    if (guardoExito) {
                        this.mostrarToast('Información Geográfica guardada con éxito!!').then();
                        this._router.navigate(['', 'tabs', 'gestion-inmueble']);
                    }
                    if (error) {
                        this.mostrarToast('Ha ocurrido un error, intentalo más tarde', 'danger').then();
                    }
                }
            );
        this.subscripciones.push(subscripcionEntidadCoordenada);
    }

    ngOnDestroy(): void {
        this.subscripciones.forEach(sub => sub.unsubscribe());
    }

    guardarEditar() {
        // TODO: delegar la accion para editar o guardar
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

    private async mostrarToast(mensaje: string, tipo: 'success' | 'danger' = 'success') {
        const toast = await this.toastController.create({
            message: mensaje,
            duration: 2000,
            color: tipo,
            position: 'top',
        });
        await toast.present();
    }

    ionViewWillLeave(): void {
        this._entidadCoordenadaStore.dispatch(
            ENTIDAD_COORD_ACCIONES.limpiarEntidades(),
        );
        this.subscripciones.forEach(sub => sub.unsubscribe());
    }

    ionViewWillEnter(): void {
        this.escucharMapa();
        this.escucharEntidadCoordenada();
    }
}
