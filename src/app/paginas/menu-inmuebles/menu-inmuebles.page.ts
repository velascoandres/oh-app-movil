import {Component, OnInit} from '@angular/core';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {AppStateInmuebles, AppState} from 'src/app/store/app.reducers';
import {InmueblesActions} from 'src/app/paginas/menu-inmuebles/menu-inmueble-store/actions/menu-inmueble.actions';
import {take} from 'rxjs/operators';
import {FiltroActions} from 'src/app/store/filtro-store/actions/filtro.actions';
import {FiltroState} from '../../store/filtro-store/filtro.state';
import {Subscription} from 'rxjs';

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

    constructor(
        private readonly inmueblesStore: Store<AppStateInmuebles>,
        private readonly filtrosStore: Store<AppState>,
    ) {
    }

    ionViewWillEnter(): void {
        // this.escucharFiltros();
    }

    ngOnInit() {
        this.escucharFiltros();
        this.cargarInmuebles(true);
    }


    private escucharFiltros() {
        this.filtrosStore
            .select('filtro')
            .subscribe(
                (estado: FiltroState) => {
                    this.estaFiltrando = estado.mostrandoFiltros;
                    if (estado.emitioFiltros) {
                        this.inmueblesStore.dispatch(
                            InmueblesActions.cargarInmuebles(
                                {filtro: true, parametros: estado.query}
                            )
                        );
                    }
                },
            );
    }

    private cargarInmuebles(filtro = false) {
        this
            .inmueblesStore
            .dispatch(
                InmueblesActions.cargarInmuebles(
                    {parametros: this.consulta, filtro}
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
                FiltroActions.mostrarFiltros(),
            );
    }

    ionViewWillLeave(): void {
        this.subscripciones.forEach(sub => sub.unsubscribe());
    }
}
