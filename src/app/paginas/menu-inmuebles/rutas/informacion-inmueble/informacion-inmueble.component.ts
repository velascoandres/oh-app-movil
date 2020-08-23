import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStateInmueble} from 'src/app/store/app.reducers';
import {InmuebleInterface} from 'src/app/interfaces/inmueble.interface';
import {OPCIONES_CARRUSEL_COVERFLOW} from './animaciones-slide/opciones-carrusel-coverflow';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-informacion-inmueble',
    templateUrl: './informacion-inmueble.component.html',
    styleUrls: ['./informacion-inmueble.component.scss'],
})
export class InformacionInmuebleComponent implements OnInit, OnDestroy {


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
        const subscripcion = this.inmubleStore
            .select('inmueble')
            .subscribe(
                (estado) => {
                    this.inmueble = estado;
                    this.totalImagenes = estado.imagenes.length;
                    this.imagenActual = 1;
                }
            );
        this.subscripciones.push(subscripcion);
    }

    gestionarPaginacion(evento) {
        this.imagenActual += evento;
    }

    ngOnDestroy(): void {
    }

}
