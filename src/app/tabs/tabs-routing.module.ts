import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { MODULOS_LAZY } from '../constantes/modulos-lazy';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      ...MODULOS_LAZY,
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/menu-inmuebles',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
