import { usuarioReducer } from './usuario-store/reducers/usuario.reducers';
import { UsuarioState } from './usuario-store/usuario.state';
import { MenuInmuebleState } from '../paginas/menu-inmuebles/menu-inmueble-store/menu-inmueble.state';
import { FavoritosState } from '../paginas/favoritos/favoritos-store/favoritos.state';
import { InmuebleState } from '../paginas/menu-inmuebles/menu-inmueble-store/inmueble.state';
import { FiltroState } from './filtro-store/filtro.state';
import { filtroReducer } from './filtro-store/reducers/filtro.reducers';


export interface AppState {
    usuario: UsuarioState;
    filtro: FiltroState;
}


export interface AppStateInmuebles extends AppState {
    inmuebles: MenuInmuebleState;
}

export interface AppStateInmueble extends AppState {
    inmueble: InmuebleState;
}

export interface AppStateFavoritos extends AppState {
    favoritos: FavoritosState;
}

export const APP_REDUCERS = {
    usuario: usuarioReducer,
    filtro: filtroReducer,
};
