import {Component, OnInit} from '@angular/core';
import {InmuebleRestService} from '../../../../modulos/compartido/servicios/rest/inmueble-rest.service';
import {InmuebleInterface} from '../../../../interfaces/inmueble.interface';
import {ToastController, ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {AppState, AppStateInmueble} from '../../../../store/app.reducers';
import {Subscription} from 'rxjs';
import {InmuebleActions} from '../../../menu-inmuebles/menu-inmueble-store/actions/inmueble.actions';
import {Router} from '@angular/router';
import {PerfilUsuarioInterface} from '../../../../interfaces/perfil-usuario.interface';

@Component({
    selector: 'app-crear-editar-inmueble',
    templateUrl: './crear-editar-inmueble.component.html',
    styleUrls: ['./crear-editar-inmueble.component.scss'],
})
export class CrearEditarInmuebleComponent implements OnInit, ViewWillLeave, ViewWillEnter {

    formularioValido: InmuebleInterface & { tipoMoneda: number, precio: number };
    subscripciones: Subscription[] = [];
    usuario: PerfilUsuarioInterface;

    constructor(
        private readonly _inmuebleRestService: InmuebleRestService,
        public toastController: ToastController,
        private readonly _inmuebleStore: Store<AppStateInmueble>,
        private readonly _router: Router,
        private readonly _usuarioState: Store<AppState>,
    ) {
    }

    ionViewWillEnter(): void {
        this.escucharUsuario();
    }

    ionViewWillLeave(): void {
        this.subscripciones.forEach(sub => sub.unsubscribe());
    }

    ngOnInit() {
        this.escucharUsuario();
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

    escucharInmuebleStore() {
        const subscripcionInmueble = this._inmuebleStore
            .select('inmueble')
            .subscribe(
                (
                    {cargo, error}) => {
                    if (cargo && !error) {
                        this.mostrarToast('Inmueble publicado con exito').then();
                        this._router.navigate(['', 'tabs', 'gestion-inmueble']);
                    } else {
                        if (error) {
                            this.mostrarToast('Ha ocurrido un error !', 'danger').then();
                            this.formularioValido = undefined;
                            console.error(error);
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
        delete this.formularioValido.precio;
        delete this.formularioValido.tipoMoneda;
        this.formularioValido.perfilUsuario = this.usuario.id;
        this._inmuebleStore.dispatch(
            InmuebleActions.crearInmueble(
                {inmueble: this.formularioValido, precio},
            ),
        );
        this.escucharInmuebleStore();
    }

    escucharInmueble(evento: (InmuebleInterface & { tipoMoneda: number, precio: number }) | undefined) {
        this.formularioValido = evento;
    }

}
