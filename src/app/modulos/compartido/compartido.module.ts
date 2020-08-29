import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from 'src/app/componentes/nav-bar/nav-bar.component';
import {InmuebleRestService} from './servicios/rest/inmueble-rest.service';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule} from '@ionic/angular';
import {InmuebleEffects} from '../../paginas/menu-inmuebles/menu-inmueble-store/effects/inmueble.effects';
import {EffectsModule} from '@ngrx/effects';
import {MapaInmueblesComponent} from './modales/mapa-inmuebles/mapa-inmuebles.component';
import {CategoriaRestService} from './servicios/rest/categoria-rest.service';
import {FormsModule} from '@angular/forms';
import {COMPARTIDO_STORE} from '../../paginas/menu-inmuebles/menu-inmueble-store/constantes/store';
import {FiltrosInmueblesComponent} from './componentes/filtros-inmuebles/filtros-inmuebles.component';
import {ListaInmuebleComponent} from './componentes/lista-inmueble/lista-inmueble.component';
import {ItemInmuebleComponent} from './componentes/item-inmueble/item-inmueble.component';
import {CarruselComponent} from './componentes/carrusel/carrusel.component';
import {BsInputComponent} from './componentes/inx-input/inx-input.component';
import {ObtenerUriPipe} from './pipes/obtener-uri.pipe';
import {TipoMonedaService} from './servicios/rest/tipo-moneda.service';


@NgModule({
    declarations: [
        NavBarComponent,
        MapaInmueblesComponent,
        FiltrosInmueblesComponent,
        ListaInmuebleComponent,
        ItemInmuebleComponent,
        CarruselComponent,
        BsInputComponent,
        ObtenerUriPipe,
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
            ),
        ...COMPARTIDO_STORE,
    ],
    providers: [
        InmuebleRestService,
        CategoriaRestService,
        TipoMonedaService,
    ],
    exports: [
        NavBarComponent,
        FiltrosInmueblesComponent,
        ListaInmuebleComponent,
        ItemInmuebleComponent,
        CarruselComponent,
        BsInputComponent,
        ObtenerUriPipe,
    ],
    entryComponents: [
        MapaInmueblesComponent,
    ]
})
export class CompartidoModule {
}
