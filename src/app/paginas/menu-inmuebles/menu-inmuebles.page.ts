import {Component, OnInit} from '@angular/core';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {AppState, AppStateInmueble} from 'src/app/store/app.reducers';
import {FiltroActions} from 'src/app/store/filtro-store/actions/filtro.actions';
import {FiltroState} from '../../store/filtro-store/filtro.state';
import {Subscription} from 'rxjs';
import {InmuebleActions} from './menu-inmueble-store/actions/inmueble.actions';

@Component({
    selector: 'app-menu-inmuebles',
    templateUrl: './menu-inmuebles.page.html',
    styleUrls: ['./menu-inmuebles.page.scss'],
})
export class MenuInmueblesPage implements OnInit, ViewWillEnter, ViewWillLeave {

    estaFiltrando = false;
    subscripciones: Subscription[] = [];
    public consulta = {
        where: {
            nombre: undefined,
            habilitado: 1,
            imagenes: {},
            categoria: {}
        },
        skip: 0,
        take: 10,
    };
    cargando = false;

    constructor(
        private readonly inmuebleStore: Store<AppStateInmueble>,
        private readonly filtrosStore: Store<AppState>,
    ) {
    }

    ionViewWillEnter(): void {
        this.encerarFiltros();
        this.escucharFiltros();
        this.escucharInmueble();
    }

    ngOnInit() {
        // this.escucharFiltros();
        this.cargarInmuebles(true);
    }


    private escucharFiltros() {
       const subscripcionFiltro = this.filtrosStore
            .select('filtro')
            .subscribe(
                (estado: FiltroState) => {
                    this.estaFiltrando = estado.mostrandoFiltros;
                    if (estado.emitioFiltros) {
                        this.inmuebleStore.dispatch(
                            InmuebleActions.cargarInmuebles(
                                {filtro: true, parametros: estado.query, sonDelUsuario: false}
                            )
                        );
                    }
                },
            );
       this.subscripciones.push(subscripcionFiltro);
    }

    private escucharInmueble() {
        const subscripcionInmueble = this.inmuebleStore
            .select('inmueble')
            .subscribe(
                ({cargando, sonDelUsuario}) => {
                    this.cargando = cargando;
                    if (sonDelUsuario) {
                        this.cargarInmuebles(true);
                    }
                },
            );
        this.subscripciones.push(subscripcionInmueble);
    }

    private cargarInmuebles(filtro = false) {
        this
            .inmuebleStore
            .dispatch(
                InmuebleActions.cargarInmuebles(
                    {parametros: this.consulta, filtro, sonDelUsuario: false}
                ),
            );
    }

    buscarPorNombre(evento) {
        if (evento) {
            const valor = evento.detail.value;
            this.consulta = {
                where: {
                    nombre: {$like: `%${valor}%`},
                    habilitado: 1,
                    imagenes: {},
                    categoria: {}
                },
                skip: 0,
                take: 10
            };
            this.cargarInmuebles(true);
        } else {
            this.cargarInmuebles(false);
        }
    }

    mostrarOcultarFiltros() {
        this
            .filtrosStore
            .dispatch(
                FiltroActions.mostrarFiltros({limpiarFiltros: true}),
            );
    }

    ionViewWillLeave(): void {
        this.subscripciones.forEach(sub => sub.unsubscribe());
    }

    encerarFiltros() {
        this
            .filtrosStore
            .dispatch(
                FiltroActions.encerarFiltro(),
            );
    }
}
