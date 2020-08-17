import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuInmueblesPage } from './menu-inmuebles.page';

const routes: Routes = [
  {
    path: '',
    component: MenuInmueblesPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuInmueblesPageRoutingModule {}
