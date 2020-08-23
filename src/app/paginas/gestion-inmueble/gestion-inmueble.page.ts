import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, AppStateInmuebles} from '../../store/app.reducers';
import {ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {PerfilUsuarioInterface} from '../../interfaces/perfil-usuario.interface';
import {Subscription} from 'rxjs';
import {InmuebleInterface} from '../../interfaces/inmueble.interface';
import {InmueblesActions} from '../menu-inmuebles/menu-inmueble-store/actions/menu-inmueble.actions';
import {Router} from '@angular/router';

@Component({
    selector: 'app-gestion-inmueble',
    templateUrl: './gestion-inmueble.page.html',
    styleUrls: ['./gestion-inmueble.page.scss'],
})
export class GestionInmueblePage implements OnInit, ViewWillEnter, ViewWillLeave {

    usuario: PerfilUsuarioInterface;
    subscripciones: Subscription[] = [];
    inmuebles: InmuebleInterface[] = [];

    constructor(
        private readonly _inmuebleStore: Store<AppStateInmuebles>,
        private readonly _usuarioState: Store<AppState>,
        private readonly _router: Router,
    ) {
    }

    ngOnInit() {
        // this.escucharUsuario();
        // this.escucharInmuebles();
    }

    ionViewWillEnter(): void {
        this.escucharUsuario();
        this.escucharInmuebles();
    }

    private escucharUsuario() {
        const subscripcionUsaurio = this._usuarioState
            .select('usuario')
            .subscribe(
                ({usuario}) => {
                    console.log(usuario);
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
            InmueblesActions.cargarInmuebles({parametros: query, filtro: true, sonDelUsuario: true})
        );
    }

    private escucharInmuebles() {
        const subscripcionInmueble = this._inmuebleStore
            .select('inmuebles')
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

}
