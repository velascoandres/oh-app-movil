import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStateInmueble} from 'src/app/store/app.reducers';
import {InmuebleInterface} from 'src/app/interfaces/inmueble.interface';
import {OPCIONES_CARRUSEL_COVERFLOW} from './animaciones-slide/opciones-carrusel-coverflow';
import {Subscription} from 'rxjs';
import {ViewWillLeave} from '@ionic/angular';

@Component({
    selector: 'app-informacion-inmueble',
    templateUrl: './informacion-inmueble.component.html',
    styleUrls: ['./informacion-inmueble.component.scss'],
})
export class InformacionInmuebleComponent implements OnInit, ViewWillLeave {


    cargando: boolean;
    inmueble: InmuebleInterface;
    opciones = OPCIONES_CARRUSEL_COVERFLOW;
    totalImagenes = 0;
    imagenActual = 1;
    subscripciones: Subscription[] = [];

    constructor(
        private readonly inmubleStore: Store<AppStateInmueble>,
    ) {
        this.cargando = true;
    }

    ngOnInit() {
        this.escucharInmueble();
    }


    private escucharInmueble() {
        const subscripcionInmueble = this.inmubleStore
            .select('inmueble')
            .subscribe(
                ({inmuebleSeleccionado}) => {
                    this.inmueble = inmuebleSeleccionado;
                    this.totalImagenes = inmuebleSeleccionado.imagenes.length;
                    this.imagenActual = 1;
                }
            );
        this.subscripciones.push(subscripcionInmueble);
    }

    gestionarPaginacion(evento) {
        this.imagenActual += evento;
    }

    ionViewWillLeave(): void {
        this.subscripciones.forEach(sub => sub.unsubscribe());
    }

}
