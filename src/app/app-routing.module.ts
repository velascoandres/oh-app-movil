import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // {
  //   path: 'menu-inmuebles',
  //   loadChildren: () => import('./paginas/menu-inmuebles/menu-inmuebles.module').then( m => m.MenuInmueblesPageModule)
  // },
  // {
  //   path: 'favoritos',
  //   loadChildren: () => import('./paginas/favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  // },
  // {
  //   path: 'gestion-inmueble',
  //   loadChildren: () => import('./paginas/gestion-inmueble/gestion-inmueble.module').then( m => m.GestionInmueblePageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
