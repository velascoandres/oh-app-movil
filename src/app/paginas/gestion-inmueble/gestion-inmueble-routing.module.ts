import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GestionInmueblePage} from './gestion-inmueble.page';
import {CrearEditarInmuebleComponent} from './rutas/crear-editar-inmueble/crear-editar-inmueble.component';
import {GestionarUbicacionGeograficaComponent} from './rutas/gestionar-ubicacion-geografica/gestionar-ubicacion-geografica.component';

const routes: Routes = [
    {
        path: '',
        component: GestionInmueblePage
    },
    {
        path: 'crear-inmueble',
        component: CrearEditarInmuebleComponent,
    },
    {
        path: 'editar-inmueble',
        component: CrearEditarInmuebleComponent,
    },
    {
        path: 'gestion-ubicacion-geografica/:idInmueble',
        component: GestionarUbicacionGeograficaComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class GestionInmueblePageRoutingModule {
}
