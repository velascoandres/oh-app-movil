import {EntityState} from '@ngrx/entity';
import {EntidadCoordenadaInterface} from '../../../../interfaces/entidad-coordenada.interface';
import {AppState} from '../../../../store/app.reducers';

export interface EntidadCoordenadaState extends EntityState<EntidadCoordenadaInterface>{
    cargando?: boolean;
    error?: any;
    registro?: EntidadCoordenadaInterface;
}



export interface AppStateEntidadCoordenada extends AppState {
    entidadCoordenada: EntidadCoordenadaState;
}
