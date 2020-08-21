import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {GestionInmueblePageRoutingModule} from './gestion-inmueble-routing.module';

import {GestionInmueblePage} from './gestion-inmueble.page';
import {CompartidoModule} from 'src/app/modulos/compartido/compartido.module';
import {ItemInmuebleGestionComponent} from './componentes/item-inmueble-gestion/item-inmueble-gestion.component';
import {ListaInmueblesUsuarioComponent} from './componentes/lista-inmuebles-usuario/lista-inmuebles-usuario.component';
import {MenuInmueblesPageModule} from '../menu-inmuebles/menu-inmuebles.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GestionInmueblePageRoutingModule,
        CompartidoModule,
        MenuInmueblesPageModule,
    ],
    declarations: [
        GestionInmueblePage,
        ItemInmuebleGestionComponent,
        ListaInmueblesUsuarioComponent,
    ]
})
export class GestionInmueblePageModule {
}
