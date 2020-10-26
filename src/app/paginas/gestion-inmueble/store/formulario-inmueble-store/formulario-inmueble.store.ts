import {AppState} from '@capacitor/core';
import {FormularioInmuebleState} from './formulario-inmueble.reducers';

export interface AppStateFormularioInmueble extends AppState {
    formularioInmueble: FormularioInmuebleState;
}
