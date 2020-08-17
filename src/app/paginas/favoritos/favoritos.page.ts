import { Component, OnInit, Query } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInmueble, AppState } from 'src/app/store/app.reducers';
import { AuthService } from 'src/app/modulos/auth/servicios/auth.service';
import { InmuebleActions } from 'src/app/modulos/compartido/menu-inmueble-store/actions/inmueble.actions';
import { InmueblesActions } from 'src/app/modulos/compartido/menu-inmueble-store/actions/menu-inmueble.actions';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit, ViewWillEnter {


  constructor(
    private readonly inmueblesStore: Store<AppStateInmueble>,
    private readonly authStore: Store<AppState>,
  ) { }

  ionViewWillEnter(): void {
    // this.inicializar();
  }

  ngOnInit() {
    // this.inicializar();
  }


  inicializar() {
    this.authStore
      .select('usuario')
      .subscribe(
        ({perfilUsuario}) => {
          console.log(perfilUsuario);
          this.cargarInmuebles(perfilUsuario.id);
        }
      );
  }

  cargarInmuebles(id: number) {
    const consulta = {
      where: {
        habilitado: 1,
        inmueblesFavoritos: {
          perfilUsuario: {id},
        },
        imagenes: {},
        categoria: {}
      }
    }
    this
      .inmueblesStore
      .dispatch(
        InmueblesActions.cargarInmuebles(
          { parametros: consulta, filtro: true }
        ),
      );
  }

}
