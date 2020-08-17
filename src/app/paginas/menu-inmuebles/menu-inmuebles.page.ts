import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppStateInmueble } from 'src/app/store/app.reducers';
import { InmueblesActions } from 'src/app/modulos/compartido/menu-inmueble-store/actions/menu-inmueble.actions';
import { take } from 'rxjs/operators';

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
    skip: 0,
    take: 10,
  };

  constructor(
    private readonly inmueblesStore: Store<AppStateInmueble>,
  ) { }
  ionViewWillEnter(): void {
    // this.cargarInmuebles();
  }

  ngOnInit() {
    this.cargarInmuebles();
  }

  cargarInmuebles() {
    console.log('llamo a cargar');
    this
      .inmueblesStore
      .dispatch(
        InmueblesActions.cargarInmuebles(
          { parametros: this.consulta }
        ),
      );
  }
}
