import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from 'src/app/componentes/nav-bar/nav-bar.component';
import { InmuebleRestService } from './servicios/rest/inmueble-rest.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { InmuebleEffects } from '../../paginas/menu-inmuebles/menu-inmueble-store/effects/inmueble.effects';
import { EffectsModule } from '@ngrx/effects';
import { CrearEditarInmuebleComponent } from './modales/crear-editar-inmueble/crear-editar-inmueble.component';
import { MapaInmueblesComponent } from './modales/mapa-inmuebles/mapa-inmuebles.component';
import { CategoriaRestService } from './servicios/rest/categoria-rest.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavBarComponent,
    CrearEditarInmuebleComponent,
    MapaInmueblesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
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
    NavBarComponent,
  ],
  entryComponents: [
    MapaInmueblesComponent,
  ]
})
export class CompartidoModule { }
