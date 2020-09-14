import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {GestionInmueblePageRoutingModule} from './gestion-inmueble-routing.module';
import {GestionInmueblePage} from './gestion-inmueble.page';
import {CompartidoModule} from 'src/app/modulos/compartido/compartido.module';
import {MenuInmueblesPageModule} from '../menu-inmuebles/menu-inmuebles.module';
import {CrearEditarInmuebleComponent} from './rutas/crear-editar-inmueble/crear-editar-inmueble.component';
import {FormularioCrearEditarInmuebleComponent} from './componentes/formulario-crear-editar-inmueble/formulario-crear-editar-inmueble.component';
import {RouterModule} from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {ItemInmuebleGestionComponent} from './componentes/item-inmueble-gestion/item-inmueble-gestion.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {StoreModule} from '@ngrx/store';
import {formularioInmuebleReducer} from './store/formulario-inmueble.reducers';
import {MapaModule} from '../../modulos/mapa/mapa.module';
import {GestionarUbicacionGeograficaComponent} from './rutas/gestionar-ubicacion-geografica/gestionar-ubicacion-geografica.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GestionInmueblePageRoutingModule,
        CompartidoModule,
        MenuInmueblesPageModule,
        ReactiveFormsModule,
        RouterModule,
        MatStepperModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        StoreModule.forFeature(
            'formularioInmueble',
            formularioInmuebleReducer,
        ),
        MapaModule,
    ],
    declarations: [
        GestionInmueblePage,
        CrearEditarInmuebleComponent,
        FormularioCrearEditarInmuebleComponent,
        ItemInmuebleGestionComponent,
        GestionarUbicacionGeograficaComponent,
    ]
})
export class GestionInmueblePageModule {
}
