import { usuarioReducer } from './usuario-store/reducers/usuario.reducers';
import { UsuarioState } from './usuario-store/usuario.state';
import { MenuInmuebleState } from '../modulos/compartido/menu-inmueble-store/menu-inmueble.state';


export interface AppState {
    usuario: UsuarioState;
}


export interface AppStateInmueble extends AppState {
    inmuebles: MenuInmuebleState;
}

export const APP_REDUCERS = {
    usuario: usuarioReducer,
};
