import {Component, OnInit} from '@angular/core';
import {ViewWillEnter} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {AppStateInmuebles, AppState} from 'src/app/store/app.reducers';
import {InmueblesActions} from 'src/app/paginas/menu-inmuebles/menu-inmueble-store/actions/menu-inmueble.actions';
import {take} from 'rxjs/operators';
import {FiltroActions} from 'src/app/store/filtro-store/actions/filtro.actions';

@Component({
    selector: 'app-menu-inmuebles',
    templateUrl: './menu-inmuebles.page.html',
    styleUrls: ['./menu-inmuebles.page.scss'],
})
export class MenuInmueblesPage implements OnInit, ViewWillEnter {

    estaFiltrando = false;
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
        // this.cargarInmuebles();
    }

    ngOnInit() {
        this.cargarInmuebles();
        this.filtrosStore
            .select('filtro')
            .subscribe(
                ({filtrando}) => this.estaFiltrando = filtrando,
            );
    }

    cargarInmuebles(filtro = false) {
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
}
