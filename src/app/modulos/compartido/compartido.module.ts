import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaInmuebleComponent } from 'src/app/componentes/lista-inmueble/lista-inmueble.component';
import { ItemInmuebleComponent } from 'src/app/componentes/item-inmueble/item-inmueble.component';
import { NavBarComponent } from 'src/app/componentes/nav-bar/nav-bar.component';
import { InmuebleRestService } from './servicios/rest/inmueble-rest.service';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { inmuebleReducer } from './menu-inmueble-store/reducers/inmueble.reducer';
import { inmueblesReducer } from './menu-inmueble-store/reducers/inmuebles.reducers';
import { IonicModule } from '@ionic/angular';
import { InmuebleEffects } from './menu-inmueble-store/effects/inmueble.effects';
import { EffectsModule } from '@ngrx/effects';

const STORE_INMUEBLE = StoreModule.forFeature(
  'inmuebles',
  inmueblesReducer,
);
@NgModule({
  declarations: [
    ListaInmuebleComponent,
    ItemInmuebleComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    STORE_INMUEBLE,
    IonicModule,
    EffectsModule
      .forRoot(
        [
          InmuebleEffects,
        ],
      )
  ],
  providers: [
    InmuebleRestService,
  ],
  exports: [
    ListaInmuebleComponent,
    ItemInmuebleComponent,
    NavBarComponent,
    InmuebleRestService,
  ]
})
export class CompartidoModule { }
