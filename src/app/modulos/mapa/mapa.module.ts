import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {mapaReducer} from './store/mapa.reducers';
import {MapaComponent} from './componentes/mapa/mapa.component';
import {MapaService} from './servicios/mapa.service';


@NgModule({
    declarations: [
        MapaComponent,
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature(
            'mapa',
            mapaReducer,
        ),
    ],
    providers: [
        MapaService,
    ],
    exports: [
        MapaComponent,
    ],
})
export class MapaModule {
}
