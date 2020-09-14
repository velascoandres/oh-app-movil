import {MapaState} from './mapa.state';
import {AppState} from '../app.reducers';

export interface MapaAppState extends AppState {
    mapa: MapaState;
}
