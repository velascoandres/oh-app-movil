import {Component, OnDestroy, OnInit} from '@angular/core';
import {EntidadCoordenadaRestService} from '../../../../modulos/compartido/servicios/rest/entidad-coordenada-rest.service';
import {MapaAppState} from '../../../../modulos/mapa/store/mapa.store';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-gestionar-ubicacion-geografica',
    templateUrl: './gestionar-ubicacion-geografica.component.html',
    styleUrls: ['./gestionar-ubicacion-geografica.component.scss'],
})
export class GestionarUbicacionGeograficaComponent implements OnInit, OnDestroy {
    subscripciones: Subscription[] = [];

    constructor(
        private readonly _entidadCooredenadaRestService: EntidadCoordenadaRestService,
        private readonly _mapaStore: Store<MapaAppState>
    ) {
    }

    ngOnInit() {
    }

    escucharMapa() {
        const subscripcionMapa = this._mapaStore
            .select('mapa')
            .subscribe(
                ({puntos}) => {
                    const puntoAGuardar: [number, number] = puntos[0] as [number, number];
                    // const entidadCoordenada: EntidadCoordenadaInterface = {
                    //     coordenadas: puntoAGuardar,
                    //     entidad: 'inmueble',
                    // },
                },
            );
        this.subscripciones.push(subscripcionMapa);
    }

    ngOnDestroy(): void {
        this.subscripciones.forEach(sub => sub.unsubscribe());
    }

}
