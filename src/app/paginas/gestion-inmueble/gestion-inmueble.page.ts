import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, AppStateInmueble} from '../../store/app.reducers';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {PerfilUsuarioInterface} from '../../interfaces/perfil-usuario.interface';
import {Subscription} from 'rxjs';
import {InmuebleInterface} from '../../interfaces/inmueble.interface';
import {Router} from '@angular/router';
import {InmuebleActions} from '../menu-inmuebles/menu-inmueble-store/actions/inmueble.actions';
import {FiltroActions} from '../../store/filtro-store/actions/filtro.actions';
import {FiltroState} from '../../store/filtro-store/filtro.state';

@Component({
    selector: 'app-gestion-inmueble',
    templateUrl: './gestion-inmueble.page.html',
    styleUrls: ['./gestion-inmueble.page.scss'],
})
export class GestionInmueblePage implements OnInit, ViewWillEnter, ViewWillLeave {

    usuario: PerfilUsuarioInterface;
    subscripciones: Subscription[] = [];
    inmuebles: InmuebleInterface[] = [];
    estaFiltrando = false;

    constructor(
        private readonly _inmuebleStore: Store<AppStateInmueble>,
        private readonly _usuarioState: Store<AppState>,
        private readonly _router: Router,
        private readonly _filtroStore: Store<AppState>,
        private readonly filtrosStore: Store<AppState>,
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter(): void {
        this.escucharFiltros();
        this.encerarFiltros();
        this.escucharInmuebles();
        this.escucharUsuario();
    }

    private escucharUsuario() {
        const subscripcionUsaurio = this._usuarioState
            .select('usuario')
            .subscribe(
                ({usuario}) => {
                    this.usuario = usuario;
                    this.cargarInmueblesDelUsuario(this.usuario.id);
                }
            );
        this.subscripciones.push(subscripcionUsaurio);
    }

    private cargarInmueblesDelUsuario(idUsuario) {
        const query = {
            where: {
                habilitado: 1,
                imagenes: {},
                perfilUsuario: {id: idUsuario},
                categoria: {},
            },
            skip: 0,
            take: 10
        };
        this._inmuebleStore.dispatch(
            InmuebleActions.cargarInmuebles({parametros: query, filtro: true, sonDelUsuario: true})
        );
    }

    private escucharInmuebles() {
        const subscripcionInmueble = this._inmuebleStore
            .select('inmueble')
            .subscribe(
                ({inmuebles}) => {
                    this.inmuebles = inmuebles;
                },
            );
        this.subscripciones.push(subscripcionInmueble);
    }

    ionViewWillLeave(): void {
        this.subscripciones.forEach(sub => sub.unsubscribe());
    }

    navegarCreacionInmueble() {
        this._router.navigate(
            ['/', 'tabs', 'gestion-inmueble', 'crear-inmueble'],
        );
    }

    mostrarOcultarFiltros() {
        this
            ._filtroStore
            .dispatch(
                FiltroActions.mostrarFiltros({limpiarFiltros: true}),
            );
    }

    private escucharFiltros() {
        const subscripcionFiltros = this.filtrosStore
            .select('filtro')
            .subscribe(
                (estado: FiltroState) => {
                    this.estaFiltrando = estado.mostrandoFiltros;
                    if (estado.emitioFiltros) {
                        this._inmuebleStore.dispatch(
                            InmuebleActions.cargarInmuebles(
                                {filtro: true, parametros: estado.query, sonDelUsuario: true}
                            )
                        );
                    }
                },
            );
        this.subscripciones.push(subscripcionFiltros);
    }

    encerarFiltros() {
        this
            .filtrosStore
            .dispatch(
                FiltroActions.encerarFiltro(),
            );
    }

}
