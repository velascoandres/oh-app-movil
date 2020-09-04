import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {InmuebleRestService} from '../../../../modulos/compartido/servicios/rest/inmueble-rest.service';
import {InmuebleFormulario, InmuebleInterface} from '../../../../interfaces/inmueble.interface';
import {ToastController, ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {AppState, AppStateInmueble} from '../../../../store/app.reducers';
import {Subscription} from 'rxjs';
import {InmuebleActions} from '../../../menu-inmuebles/menu-inmueble-store/actions/inmueble.actions';
import {Router} from '@angular/router';
import {PerfilUsuarioInterface} from '../../../../interfaces/perfil-usuario.interface';
import {FormularioCrearEditarInmuebleComponent} from '../../componentes/formulario-crear-editar-inmueble/formulario-crear-editar-inmueble.component';
import {AppStateFormularioInmueble} from '../../store/formulario-inmueble.store';

@Component({
    selector: 'app-crear-editar-inmueble',
    templateUrl: './crear-editar-inmueble.component.html',
    styleUrls: ['./crear-editar-inmueble.component.scss'],
})
export class CrearEditarInmuebleComponent implements OnInit, ViewWillLeave, ViewWillEnter, AfterViewInit {

    formularioValido: InmuebleFormulario;
    subscripciones: Subscription[] = [];
    usuario: PerfilUsuarioInterface;
    @ViewChild('formulario') formularioInmueble: FormularioCrearEditarInmuebleComponent;

    constructor(
        private readonly _inmuebleRestService: InmuebleRestService,
        public toastController: ToastController,
        private readonly _inmuebleStore: Store<AppStateInmueble>,
        private readonly _router: Router,
        private readonly _usuarioState: Store<AppState>,
        private readonly _formularioInmuebleStore: Store<AppStateFormularioInmueble>,
    ) {
    }

    ionViewWillEnter(): void {
        // this.formularioInmueble.limpiarFormulario();
        this.escucharUsuario();
    }

    ionViewWillLeave(): void {
        this.subscripciones.forEach(sub => sub.unsubscribe());
    }

    ngOnInit() {
        this.escucharUsuario();
        this.escucharInmuebleStore();
        this.escucharFormularioStore();
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
                ({inmueble}) => {
                    if (inmueble) {
                        this.formularioValido = inmueble;
                    } else {
                        // this.formularioInmueble.limpiarFormulario();
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
                    if (cargando) {
                        // Agregar un loader
                    }
                    if (cargo && !error && this.formularioValido) {
                        this.mostrarToast('Inmueble publicado con exito').then();
                        // this.formularioInmueble.limpiarFormulario();
                        this._router.navigate(['', 'tabs', 'gestion-inmueble']);
                    } else {
                        if (error) {
                            this.mostrarToast('Ha ocurrido un error !', 'danger').then();
                            console.error(error);
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
        this.escucharInmuebleStore();
    }

    escucharInmueble(evento: (InmuebleInterface & { tipoMoneda: number, precio: number }) | undefined) {
        this.formularioValido = evento;
    }

    ngAfterViewInit(): void {
        // this.formularioInmueble.limpiarFormulario();
    }

}
