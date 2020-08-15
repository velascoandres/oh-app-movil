import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionInmueblePageRoutingModule } from './gestion-inmueble-routing.module';

import { GestionInmueblePage } from './gestion-inmueble.page';
import { CompartidoModule } from 'src/app/modulos/compartido/compartido.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionInmueblePageRoutingModule,
    CompartidoModule,
  ],
  declarations: [GestionInmueblePage]
})
export class GestionInmueblePageModule {}
