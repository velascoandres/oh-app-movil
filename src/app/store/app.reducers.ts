import { usuarioReducer } from './usuario-store/reducers/usuario.reducers';
import { UsuarioState } from './usuario-store/usuario.state';


export interface AppState {
    usuario: UsuarioState;
}

export const APP_REDUCERS = {
    usuario: usuarioReducer,
};
