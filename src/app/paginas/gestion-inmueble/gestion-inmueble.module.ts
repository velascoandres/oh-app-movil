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
    ],
    declarations: [
        GestionInmueblePage,
        CrearEditarInmuebleComponent,
        FormularioCrearEditarInmuebleComponent,
        ItemInmuebleGestionComponent,
    ]
})
export class GestionInmueblePageModule {
}
