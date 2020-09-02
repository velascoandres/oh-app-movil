import {Component, Input, OnInit} from '@angular/core';
import {InmuebleInterface} from '../../../../interfaces/inmueble.interface';
import {InmuebleActions} from '../../../menu-inmuebles/menu-inmueble-store/actions/inmueble.actions';
import {Store} from '@ngrx/store';
import {AppStateInmueble} from '../../../../store/app.reducers';
import {Router} from '@angular/router';

@Component({
    selector: 'app-item-inmueble-gestion',
    templateUrl: './item-inmueble-gestion.component.html',
    styleUrls: ['./item-inmueble-gestion.component.scss'],
})
export class ItemInmuebleGestionComponent implements OnInit {
    @Input()
    inmueble: InmuebleInterface;

    constructor(
        private readonly inmuebleStore: Store<AppStateInmueble>,
        private readonly _router: Router,
    ) {
    }

    ngOnInit() {
    }

    async verInformacion() {
        this.inmuebleStore.dispatch(
            InmuebleActions.cargarInmueble({parametros: this.inmueble}),
        );
        this._router.navigate(['/', 'detalle-inmueble']);
    }

}
