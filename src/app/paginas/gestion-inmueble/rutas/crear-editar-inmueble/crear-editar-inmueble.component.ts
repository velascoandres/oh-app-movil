import {Component, OnInit} from '@angular/core';
import {InmuebleRestService} from '../../../../modulos/compartido/servicios/rest/inmueble-rest.service';
import {InmuebleFormulario, InmuebleInterface} from '../../../../interfaces/inmueble.interface';
import {ToastController, ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {AppState, AppStateInmueble} from '../../../../store/app.reducers';
import {Subscription} from 'rxjs';
import {InmuebleActions} from '../../../menu-inmuebles/menu-inmueble-store/actions/inmueble.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {PerfilUsuarioInterface} from '../../../../interfaces/perfil-usuario.interface';
import {AppStateFormularioInmueble} from '../../store/formulario-inmueble.store';
import {FormularioInmuebleActions} from '../../store/formulario-inmueble.actions';
import {eliminarPropiedadesObjeto} from '../../../../../lib/eliminar-propiedades-objeto';

@Component({
    selector: 'app-crear-editar-inmueble',
    templateUrl: './crear-editar-inmueble.component.html',
    styleUrls: ['./crear-editar-inmueble.component.scss'],
})
export class CrearEditarInmuebleComponent implements OnInit, ViewWillLeave, ViewWillEnter {

    formularioValido: InmuebleFormulario;
    subscripciones: Subscription[] = [];
    usuario: PerfilUsuarioInterface;
    cargando: boolean;
    estaEditando: boolean;

    constructor(
        private readonly _inmuebleRestService: InmuebleRestService,
        public toastController: ToastController,
        private readonly _inmuebleStore: Store<AppStateInmueble>,
        private readonly _router: Router,
        private readonly _usuarioState: Store<AppState>,
        private readonly _formularioInmuebleStore: Store<AppStateFormularioInmueble>,
        private readonly _activateRoute: ActivatedRoute,
    ) {
    }

    ionViewWillEnter(): void {
        this.escucharUsuario();
    }

    ionViewWillLeave(): void {
        this.subscripciones.forEach(sub => sub.unsubscribe());
    }

    ngOnInit() {
        this._activateRoute
            .queryParams
            .subscribe(
                (parametros: { inmueble: string }) => {
                    this.estaEditando = !!parametros.inmueble;
                    if (this.estaEditando) {
                        try {
                            const inmueble = JSON.parse(parametros.inmueble);
                            this._inmuebleStore
                                .dispatch(
                                    FormularioInmuebleActions.llenarFormulario({inmueble})
                                );
                        } catch (e) {
                            this.estaEditando = false;
                            this._formularioInmuebleStore.dispatch(
                                FormularioInmuebleActions.vaciarFormulario()
                            );
                        }
                    } else {
                        this._formularioInmuebleStore.dispatch(
                            FormularioInmuebleActions.vaciarFormulario()
                        );
                    }
                    this.escucharFormularioStore();
                }
            );
    }

    private escucharUsuario() {
        const subscripcionUsaurio = this._usuarioState
            .select('usuario')
            .subscribe(
                ({usuario}) => {
                    this.usuario = usuario;
                }
            );
        this.subscripciones.push(subscripcionUsaurio);
    }

    private escucharFormularioStore() {
        const subscripcionFormulario = this._formularioInmuebleStore
            .select('formularioInmueble')
            .subscribe(
                ({inmueble, estaValido}) => {
                    this.formularioValido = undefined;
                    if (inmueble && estaValido) {
                        this.formularioValido = inmueble;
                    }
                }
            );
        this.subscripciones.push(subscripcionFormulario);
    }

    escucharInmuebleStore() {
        const subscripcionInmueble = this._inmuebleStore
            .select('inmueble')
            .subscribe(
                (
                    {cargo, error, cargando}) => {
                    this.cargando = cargando;
                    if (cargo && !error) {
                        if (this.estaEditando) {
                            this.mostrarToast('Publicacion editada con exito').then();
                        } else {
                            this.mostrarToast('Publicacion guardada con exito').then();
                        }
                        // this.formularioInmueble.limpiarFormulario();
                        this._router.navigate(['', 'tabs', 'gestion-inmueble']);
                    } else {
                        if (error) {
                            this.mostrarToast('Ha ocurrido un error !', 'danger').then();
                            this.formularioValido = undefined;
                        }
                    }
                }
            );
        this.subscripciones.push(subscripcionInmueble);
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


    guardarInmueble(): void {
        this.escucharInmuebleStore();
        const precio = {
            valor: +this.formularioValido.precio,
            tipoMoneda: this.formularioValido.tipoMoneda,
        };
        const datosInmueble = {
            ...this.formularioValido,
            perfilUsuario: this.usuario.id,
        };
        this._inmuebleStore.dispatch(
            InmuebleActions.crearInmueble(
                {inmueble: datosInmueble, precio},
            ),
        );
    }

    editarInmueble(): void {
        this.escucharInmuebleStore();
        const precio = {
            valor: +this.formularioValido.precio,
            tipoMoneda: this.formularioValido.tipoMoneda,
        };
        const datosInmueble: InmuebleFormulario = {
            ...this.formularioValido,
            perfilUsuario: this.usuario.id,
            habilitado: 1
        };
        const inmuebleParaEditar = eliminarPropiedadesObjeto(
            datosInmueble,
            ['precio', 'tipoMoneda', 'valor'],
        ) as InmuebleInterface;
        this._inmuebleStore.dispatch(
            InmuebleActions.actualizarInmueble(
                {inmueble: inmuebleParaEditar, precio},
            ),
        );
    }

}
