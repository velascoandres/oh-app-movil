import { Component, OnInit } from '@angular/core';
import { ViewWillLeave, ViewWillEnter } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppStateInmueble } from 'src/app/store/app.reducers';
import { InmueblesActions } from 'src/app/modulos/compartido/menu-inmueble-store/actions/menu-inmueble.actions';

@Component({
  selector: 'app-menu-inmuebles',
  templateUrl: './menu-inmuebles.page.html',
  styleUrls: ['./menu-inmuebles.page.scss'],
})
export class MenuInmueblesPage implements OnInit, ViewWillEnter {

  consulta = {
    where: {
      habilitado: 1,
      imagenes: {},
      categoria: {}
    },
  };

  constructor(
    private readonly inmueblesStore: Store<AppStateInmueble>,
  ) { }
  ionViewWillEnter(): void {
    this.cargarInmuebles();
  }

  ngOnInit() {
    this.cargarInmuebles();
  }

  cargarInmuebles() {
    this
      .inmueblesStore
      .dispatch(
        InmueblesActions.cargarInmuebles(
          { parametros: this.consulta }
        ),
      );
  }

}
