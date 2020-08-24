import {Component, OnInit, Input} from '@angular/core';
import {InmuebleInterface} from 'src/app/interfaces/inmueble.interface';
import {Store} from '@ngrx/store';
import {InmuebleState} from 'src/app/paginas/menu-inmuebles/menu-inmueble-store/inmueble.state';
import {ModalController} from '@ionic/angular';
import {InformacionInmuebleComponent} from 'src/app/rutas-generales/informacion-inmueble/informacion-inmueble.component';
import {InmuebleActions} from 'src/app/paginas/menu-inmuebles/menu-inmueble-store/actions/inmueble.actions';
import {Router} from '@angular/router';
import {OPCIONES_CARRUSEL_COVERFLOW} from '../../../../rutas-generales/informacion-inmueble/animaciones-slide/opciones-carrusel-coverflow';
import {OPCIONES_CARRUSEL_FADE} from '../../../../rutas-generales/informacion-inmueble/animaciones-slide/opciones-carrusel-fade';

@Component({
    selector: 'app-item-inmueble',
    templateUrl: './item-inmueble.component.html',
    styleUrls: ['./item-inmueble.component.scss'],
})
export class ItemInmuebleComponent implements OnInit {

    @Input()
    inmueble: InmuebleInterface;


    constructor(
        private readonly inmuebleStore: Store<InmuebleState>,
        private readonly modalController: ModalController,
        private readonly _router: Router,
    ) {
    }

    ngOnInit() {
    }

    async verInformacion() {
        // const modal = await this.modalController.create({
        //   component: InformacionInmuebleComponent,
        // });
        this.inmuebleStore.dispatch(
            InmuebleActions.cargarInmueble({parametros: this.inmueble}),
        );
        this._router.navigate(['/', 'detalle-inmueble']);
        // return await modal.present();
    }

}
