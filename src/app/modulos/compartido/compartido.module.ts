import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaInmuebleComponent } from 'src/app/componentes/lista-inmueble/lista-inmueble.component';
import { ItemInmuebleComponent } from 'src/app/componentes/item-inmueble/item-inmueble.component';
import { NavBarComponent } from 'src/app/componentes/nav-bar/nav-bar.component';
import { InmuebleRestService } from './servicios/rest/inmueble-rest.service';
import { HttpClientModule } from '@angular/common/http';


import { IonicModule } from '@ionic/angular';
import { InmuebleEffects } from './menu-inmueble-store/effects/inmueble.effects';
import { EffectsModule } from '@ngrx/effects';
import { COMPARTIDO_STORE } from './constantes/store';
import { CrearEditarInmuebleComponent } from './modales/crear-editar-inmueble/crear-editar-inmueble.component';
import { MapaInmueblesComponent } from './modales/mapa-inmuebles/mapa-inmuebles.component';
import { InformacionInmuebleComponent } from './modales/informacion-inmueble/informacion-inmueble.component';
import { CategoriaRestService } from './servicios/rest/categoria-rest.service';
import { FiltrosInmueblesComponent } from 'src/app/componentes/filtros-inmuebles/filtros-inmuebles.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaInmuebleComponent,
    ItemInmuebleComponent,
    NavBarComponent,
    CrearEditarInmuebleComponent,
    MapaInmueblesComponent,
    InformacionInmuebleComponent,
    FiltrosInmueblesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ...COMPARTIDO_STORE,
    IonicModule,
    FormsModule,
    EffectsModule
      .forFeature(
        [
          InmuebleEffects,
        ],
      )
  ],
  providers: [
    InmuebleRestService,
    CategoriaRestService,
  ],
  exports: [
    ListaInmuebleComponent,
    ItemInmuebleComponent,
    NavBarComponent,
    InmuebleRestService,
  ],
  entryComponents: [
    CrearEditarInmuebleComponent,
    MapaInmueblesComponent,
    InformacionInmuebleComponent,
  ]
})
export class CompartidoModule { }
