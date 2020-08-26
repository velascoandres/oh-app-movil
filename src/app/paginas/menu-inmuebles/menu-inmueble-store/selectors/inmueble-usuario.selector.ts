import {createSelector} from '@ngrx/store';
import {AppState, AppStateInmueble} from '../../../../store/app.reducers';
import {InmuebleState} from '../inmueble.state';
import {UsuarioState} from '../../../../store/usuario-store/usuario.state';


export const seleccionarUsuario = (state: AppState) => state.usuario;
export const seleccionarInmueble = (state: AppStateInmueble) => state.inmueble;

export const inmuebleUsuarioSelector = createSelector(
    seleccionarUsuario,
    seleccionarInmueble,
    (estadoUsuario: UsuarioState, estadoInmueble: InmuebleState) => {
        return {estadoUsuario, estadoInmueble};
    }
);
