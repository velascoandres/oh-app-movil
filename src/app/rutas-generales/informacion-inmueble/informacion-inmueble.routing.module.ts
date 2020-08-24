import {RouterModule, Routes} from '@angular/router';
import {InformacionInmuebleComponent} from './informacion-inmueble.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: InformacionInmuebleComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InformacionInmuebleRoutingModule {
}
