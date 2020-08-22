import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {MenuInmueblesPageRoutingModule} from './menu-inmuebles-routing.module';
import {MenuInmueblesPage} from './menu-inmuebles.page';
import {CompartidoModule} from 'src/app/modulos/compartido/compartido.module';
import {RouterModule} from '@angular/router';
import {COMPARTIDO_STORE} from './menu-inmueble-store/constantes/store';
import {InformacionInmuebleComponent} from '../../modulos/compartido/modales/informacion-inmueble/informacion-inmueble.component';
import {FiltrosInmueblesComponent} from './componentes/filtros-inmuebles/filtros-inmuebles.component';
import {ListaInmuebleComponent} from './componentes/lista-inmueble/lista-inmueble.component';
import {ItemInmuebleComponent} from './componentes/item-inmueble/item-inmueble.component';
import {CarruselComponent} from './componentes/carrusel/carrusel.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MenuInmueblesPageRoutingModule,
        CompartidoModule,
        RouterModule,
        ...COMPARTIDO_STORE,
    ],
    declarations: [
        MenuInmueblesPage,
        InformacionInmuebleComponent,
        FiltrosInmueblesComponent,
        ListaInmuebleComponent,
        ItemInmuebleComponent,
        CarruselComponent,
    ],
    exports: [
        ListaInmuebleComponent
    ],
    entryComponents: [
        InformacionInmuebleComponent,
    ]
})
export class MenuInmueblesPageModule {

}
