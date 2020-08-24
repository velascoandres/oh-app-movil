import {NgModule} from '@angular/core';
import {InformacionInmuebleComponent} from './informacion-inmueble.component';
import {InformacionInmuebleRoutingModule} from './informacion-inmueble.routing.module';
import {CompartidoModule} from '../../modulos/compartido/compartido.module';
import {IonicModule} from '@ionic/angular';

@NgModule(
    {
        imports: [
            CompartidoModule,
            InformacionInmuebleRoutingModule,
            IonicModule,
        ],
        declarations: [
            InformacionInmuebleComponent,
        ],
        exports: [],
    }
)
export class InformacionInmuebleModule {
}
