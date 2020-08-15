import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionInmueblePage } from './gestion-inmueble.page';

const routes: Routes = [
  {
    path: '',
    component: GestionInmueblePage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class GestionInmueblePageRoutingModule {}
