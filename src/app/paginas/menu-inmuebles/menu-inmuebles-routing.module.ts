import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MenuInmueblesPage} from './menu-inmuebles.page';
import {InformacionInmuebleComponent} from '../../modulos/compartido/modales/informacion-inmueble/informacion-inmueble.component';

const routes: Routes = [
    {
        path: '',
        component: MenuInmueblesPage
    },
    {
        path: 'detalle-inmueble',
        component: InformacionInmuebleComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MenuInmueblesPageRoutingModule {
}
