import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuInmueblesPageRoutingModule } from './menu-inmuebles-routing.module';

import { MenuInmueblesPage } from './menu-inmuebles.page';
import { CompartidoModule } from 'src/app/modulos/compartido/compartido.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuInmueblesPageRoutingModule,
    CompartidoModule,
  ],
  declarations: [
    MenuInmueblesPage,
  ],
})
export class MenuInmueblesPageModule {

}
