import {Action, createReducer, on} from '@ngrx/store';
import {InmuebleInterface} from '../../../interfaces/inmueble.interface';
import {GestionInmuebleActions} from './gestion-inmueble.actions';

export interface GestionInmuebleState {
    inmuebles: InmuebleInterface[];
    error: any;
    cargando: boolean;
    query: any;
}

export const initialGestionInmuebleState: GestionInmuebleState = {
    inmuebles: [],
    error: null,
    cargando: false,
    query: {},
};

const _gestionInmuebleReducer = createReducer(
    initialGestionInmuebleState,
    on(
        GestionInmuebleActions.cargarInmueblesGestion,
        (state: GestionInmuebleState, {parametros}) => (
            {
                ...state,
                cargando: true,
                parametros,
            }
        )
    ),
    on(
        GestionInmuebleActions.cargarInmueblesGestionExito,
        (state: GestionInmuebleState, {inmuebles}) => (
            {
                ...state,
                cargando: false,
                inmuebles,
                error: null,
            }
        ),
    ),
    on(
        GestionInmuebleActions.cargarInmueblesGestionExito,
        (state: GestionInmuebleState, {inmuebles}) => (
            {
                ...state,
                cargando: false,
                inmuebles,
                error: null,
            }
        ),
    ),
);

export function gestionInmuebleReducer(state: GestionInmuebleState | undefined, action: Action) {
    return _gestionInmuebleReducer(state, action);
}
