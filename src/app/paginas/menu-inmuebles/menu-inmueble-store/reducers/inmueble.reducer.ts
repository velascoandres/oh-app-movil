import {createReducer, on, Action} from '@ngrx/store';
import {InmuebleState} from '../inmueble.state';
import {InmuebleActions} from '../actions/inmueble.actions';
import {InmuebleInterface} from '../../../../interfaces/inmueble.interface';

export const estadoInicialInmuebles: InmuebleState = {
    cargando: false,
    cargo: false,
    error: null,
    edito: false,
    inmuebleSeleccionado: undefined,
    total: 0,
    filtro: false,
    queryActual: undefined,
    inmuebles: [],
    sonDelUsuario: false,
};

const _inmuebleReducer = createReducer(
    estadoInicialInmuebles,
    // Cargar
    on(
        InmuebleActions.cargarInmueble,
        (estado: InmuebleState, {parametros}) => {
            return {
                ...estado,
                inmuebleSeleccionado: parametros,
                cargando: true,
                error: undefined,
            };
        },
    ),
    on(
        InmuebleActions.cargarInmuebleExito,
        (estado: InmuebleState, {inmueble}) => {
            return {
                ...estado,
                inmuebleSeleccionado: inmueble,
                cargando: false,
                cargo: true,
            };
        },
    ),
    on(
        InmuebleActions.cargarInmuebleLocalPorId,
        (estado: InmuebleState, {id}) => {
            const inmuebleSeleccionado = estado.inmuebles.find(
                (inmueble: InmuebleInterface) => +inmueble.id === +id,
            );
            return {
                ...estado,
                inmuebleSeleccionado,
                cargando: false,
                cargo: true,
            };
        },
    ),
    on(
        InmuebleActions.cargarInmuebleError,
        (estado: InmuebleState, {error}) => {
            return {
                ...estado,
                cargando: false,
                cargo: false,
                error,
                inmuebleSeleccionado: undefined,
            };
        }
    ),
    // Crear
    on(
        InmuebleActions.crearInmueble,
        (estado: InmuebleState, {inmueble}) => {
            return {
                ...estado,
                cargando: true,
                cargo: false,
                error: undefined,
                inmuebleSeleccionado: inmueble,
            };
        },
    ),
    on(
        InmuebleActions.crearInmuebleExito,
        (estado: InmuebleState) => {
            return {
                ...estado,
                inmuebleSeleccionado: undefined,
                cargando: false,
                cargo: true,
                error: undefined,
            };
        },
    ),
    on(
        InmuebleActions.crearInmuebleError,
        (estado: InmuebleState, {error}) => {
            return {
                ...estado,
                cargando: false,
                cargo: true,
                error,
                inmuebleSeleccionado: undefined,
            };
        },
    ),
    // Actualizar
    on(
        InmuebleActions.actualizarInmueble,
        (estado: InmuebleState, {inmueble}) => {
            return {
                ...estado,
                inmuebleSeleccionado: inmueble,
                cargando: true,
                cargo: false,
                error: undefined,
            };
        },
    ),
    on(
        InmuebleActions.actualizarInmuebleExito,
        (estado: InmuebleState, {inmueble}) => {
            return {
                ...estado,
                inmuebleSeleccionado: inmueble,
                cargando: false,
                cargo: true,
            };
        },
    ),
    on(
        InmuebleActions.actualizarInmuebleError,
        (estado: InmuebleState, {error}) => {
            return {
                ...estado,
                error,
                cargando: false,
                cargo: false,
                inmuebleSeleccionado: undefined,
            };
        },
    ),
    // Deshabilitar
    on(
        InmuebleActions.deshabilitarInmueble,
        (estado: InmuebleState, {inmueble}) => {
            return {
                ...estado,
                cargando: true,
                cargo: false,
                error: undefined,
                inmuebleSeleccionado: inmueble,
            };
        },
    ),
    on(
        InmuebleActions.deshabilitarInmuebleExito,
        (estado: InmuebleState, {inmueble}) => {
            return {
                ...estado,
                cargando: false,
                cargo: true,
                inmuebleSeleccionado: inmueble,
            };
        },
    ),
    on(
        InmuebleActions.deshabilitarInmuebleError,
        (estado: InmuebleState, {error}) => {
            return {
                ...estado,
                error,
                cargando: false,
                cargo: false,
                inmuebleSeleccionado: undefined,
            };
        },
    ),
    on(
        InmuebleActions.cargarInmuebles,
        (estado: InmuebleState, {parametros, filtro, sonDelUsuario}) => {
            return {
                ...estado,
                queryActual: {
                    ...estado.queryActual,
                    ...parametros,
                },
                cargando: true,
                filtro,
                sonDelUsuario,
            };
        }
    ),
    on(
        InmuebleActions.cargarInmueblesExito,
        (estado: InmuebleState, {inmuebles, total, nextQuery}) => {
            let inmueblesNuevos = [];
            if (estado.filtro) {
                inmueblesNuevos = inmuebles;
            } else {
                inmueblesNuevos = [
                    ...estado.inmuebles,
                    ...inmuebles,
                ];
            }
            return {
                ...estado,
                inmuebles: [
                    ...inmueblesNuevos
                ],
                total,
                cargando: false,
                cargo: true,
            };
        },
    ),
    on(
        InmuebleActions.cargarInmueblesError,
        (estado: InmuebleState, {error}) => {
            return {
                ...estado,
                cargando: false,
                cargo: false,
                error,
            };
        }
    ),
);


export function inmuebleReducer(state: InmuebleState | undefined, action: Action) {
    return _inmuebleReducer(state, action);
}

