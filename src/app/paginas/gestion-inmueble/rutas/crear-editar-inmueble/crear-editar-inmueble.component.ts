import {Component, OnInit} from '@angular/core';
import {InmuebleRestService} from '../../../../modulos/compartido/servicios/rest/inmueble-rest.service';
import {InmuebleInterface} from '../../../../interfaces/inmueble.interface';
import {ToastController, ViewWillLeave} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {AppStateInmueble} from '../../../../store/app.reducers';
import {Subscription} from 'rxjs';
import {InmuebleActions} from '../../../menu-inmuebles/menu-inmueble-store/actions/inmueble.actions';

@Component({
    selector: 'app-crear-editar-inmueble',
    templateUrl: './crear-editar-inmueble.component.html',
    styleUrls: ['./crear-editar-inmueble.component.scss'],
})
export class CrearEditarInmuebleComponent implements OnInit, ViewWillLeave {

    formularioValido: InmuebleInterface;
    subscripciones: Subscription[] = [];

    constructor(
        private readonly _inmuebleRestService: InmuebleRestService,
        public toastController: ToastController,
        private readonly _inmuebleStore: Store<AppStateInmueble>
    ) {
    }

    ionViewWillLeave(): void {
        this.subscripciones.forEach(sub => sub.unsubscribe());
    }

    ngOnInit() {
    }

    escucharInmuebleStore() {
        const subscripcionInmueble = this._inmuebleStore
            .select('inmueble')
            .subscribe(
                ({cargo, predio}) => {
                    if (cargo && +predio === +this.formularioValido.predio) {
                        this.mostrarToast('Inmueble publicado con exito').then();
                    } else {
                        this.mostrarToast('Ha ocurrido un error !', 'danger').then();
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
        this._inmuebleStore.dispatch(
            InmuebleActions.crearInmueble(
                {inmueble: this.formularioValido},
            ),
        );
        this.escucharInmuebleStore();
    }

    escucharInmueble(evento) {
        this.formularioValido = evento;
    }

}
