export const MODULOS_LAZY = [
    {
        path: 'menu-inmuebles',
        loadChildren: () => import('../paginas/menu-inmuebles/menu-inmuebles.module').then(m => m.MenuInmueblesPageModule)
    },
    {
        path: 'favoritos',
        loadChildren: () => import('../paginas/favoritos/favoritos.module').then(m => m.FavoritosPageModule)
    },
    {
        path: 'gestion-inmueble',
        loadChildren: () => import('../paginas/gestion-inmueble/gestion-inmueble.module').then(m => m.GestionInmueblePageModule)
    },
];
