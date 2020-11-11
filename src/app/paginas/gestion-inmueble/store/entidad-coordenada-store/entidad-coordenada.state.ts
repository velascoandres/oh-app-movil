import {EntityState} from '@ngrx/entity';
import {EntidadCoordenadaInterface} from '../../../../interfaces/entidad-coordenada.interface';

export interface EntidadCoordenadaState extends EntityState<EntidadCoordenadaInterface>{
    cargando?: boolean;
    error?: any;
    registro?: EntidadCoordenadaInterface;
}

