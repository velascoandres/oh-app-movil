import {MapaState} from './mapa.state';
import {AppState} from '../../../store/app.reducers';

export interface MapaAppState extends AppState {
    mapa: MapaState;
}
