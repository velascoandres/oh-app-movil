import {AppState} from '../../../store/app.reducers';
import {GestionInmuebleState} from './gestion-inmueble.reducers';

export interface AppStateGestionInmuebles extends AppState {
    gestionInmuebles: GestionInmuebleState;
}
