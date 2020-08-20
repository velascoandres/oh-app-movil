import { usuarioReducer } from './usuario-store/reducers/usuario.reducers';
import { UsuarioState } from './usuario-store/usuario.state';
import { MenuInmuebleState } from '../modulos/compartido/menu-inmueble-store/menu-inmueble.state';
import { FavoritosState } from '../modulos/compartido/favoritos-store/favoritos.state';
import { InmuebleState } from '../modulos/compartido/menu-inmueble-store/inmueble.state';
import { FiltroState } from './filtro-store/filtro.state';
import { filtroReducer } from './filtro-store/reducers/filtro.reducers';


export interface AppState {
    usuario: UsuarioState;
    filtro: FiltroState;
}


export interface AppStateInmueble extends AppState {
    inmuebles: MenuInmuebleState;
}

export interface AppStateInmuebleSolo extends AppState {
    inmueble: InmuebleState;
}

export interface AppStateFavoritos extends AppState {
    favoritos: FavoritosState;
}

export const APP_REDUCERS = {
    usuario: usuarioReducer,
    filtro: filtroReducer,
};
