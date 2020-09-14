import {Component, Input, OnInit} from '@angular/core';
import {InmuebleInterface} from '../../../../interfaces/inmueble.interface';
import {InmuebleActions} from '../../../menu-inmuebles/menu-inmueble-store/actions/inmueble.actions';
import {Store} from '@ngrx/store';
import {AppStateInmueble} from '../../../../store/app.reducers';
import {Router} from '@angular/router';
import {AppStateFormularioInmueble} from '../../store/formulario-inmueble.store';
import {FormularioInmuebleActions} from '../../store/formulario-inmueble.actions';

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
        private readonly formularioInmuebleStore: Store<AppStateFormularioInmueble>,
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

    async editarInmueble(inmueble: InmuebleInterface) {
        this._router.navigate(
            ['/', 'tabs', 'gestion-inmueble', 'editar-inmueble'],
            {
                queryParams: {
                    inmueble: JSON.stringify(inmueble),
                }
            }
        );
    }

    async gestionarUbicacionGeografica(inmueble: InmuebleInterface) {
        await this._router.navigate(
            ['/', 'tabs', 'gestion-inmueble', 'gestion-ubicacion-geografica', inmueble.id],
            {
                queryParams: {
                    nombre: inmueble.nombre,
                }
            }
        );
    }

}
