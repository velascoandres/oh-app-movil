import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaInmuebleComponent } from 'src/app/componentes/lista-inmueble/lista-inmueble.component';
import { ItemInmuebleComponent } from 'src/app/componentes/item-inmueble/item-inmueble.component';
import { NavBarComponent } from 'src/app/componentes/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    ListaInmuebleComponent,
    ItemInmuebleComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListaInmuebleComponent,
    ItemInmuebleComponent,
    NavBarComponent,
  ]
})
export class CompartidoModule { }
