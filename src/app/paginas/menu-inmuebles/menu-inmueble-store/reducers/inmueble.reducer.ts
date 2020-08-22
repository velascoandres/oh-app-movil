import { createReducer, on, Action } from '@ngrx/store';
import { InmuebleState } from '../inmueble.state';
import { InmuebleActions } from '../actions/inmueble.actions';

export const estadoInicialInmuebles: InmuebleState = {
    cargando: false,
    cargo: false,
    error: null,
    edito: false,
    nombre: '',
    descripcion: '',
    habilitado: 0,
    precio: 0,
    plantas: 0,
    parqueaderos: 0,
    imagenes: [],
    categoria: null,
    esAlquiler: 0,
    perfilUsuario: null,
    direccion: '',
    habitaciones: 0,
};

const _inmuebleReducer = createReducer(
    estadoInicialInmuebles,
    // Cargar
    on(
        InmuebleActions.cargarInmueble,
        (estado: InmuebleState, { parametros }) => {
            return {
                ...estado,
                ...parametros,
                cargando: true,
            };
        },
    ),
    on(
        InmuebleActions.cargarInmuebleExito,
        (estado: InmuebleState, { inmueble }) => {
            return {
                ...estado,
                ...inmueble,
                cargando: false,
                cargo: true,
            };
        },
    ),
    on(
        InmuebleActions.cargarInmuebleError,
        (estado: InmuebleState, { error }) => {
            return {
                ...estado,
                cargando: false,
                cargo: false,
                error,
            };
        }
    ),
    // Agregar favoritos
    on(
        InmuebleActions.agregarFavoritos,
        (estado: InmuebleState, { inmueble }) => {
            return {
                ...estado,
                ...inmueble,
                cargando: true,
                cargo: false,
            };
        },
    ),
    on(
        InmuebleActions.agregarFavoritosInmuebleExito,
        (estado: InmuebleState, { inmueble }) => {
            return {
                ...estado,
                ...inmueble,
                cargando: false,
                cargo: true,
            };
        },
    ),
    on(
        InmuebleActions.agregarFavoritosInmuebleError,
        (estado: InmuebleState, { error }) => {
            return {
                ...estado,
                cargando: false,
                cargo: false,
                error,
            };
        },
    ),
    // Crear
    on(
        InmuebleActions.crearInmueble,
        (estado: InmuebleState, { inmueble }) => {
            return {
                ...estado,
                ...inmueble,
                cargando: true,
                cargo: false,
            };
        },
    ),
    on(
        InmuebleActions.crearInmuebleExito,
        (estado: InmuebleState, { inmueble }) => {
            return {
                ...estado,
                ...inmueble,
                cargando: false,
                cargo: true,
            };
        },
    ),
    on(
        InmuebleActions.crearInmuebleError,
        (estado: InmuebleState, { error }) => {
            return {
                ...estado,
                cargando: false,
                cargo: true,
                error,
            };
        },
    ),
    // Actualizar
    on(
        InmuebleActions.actualizarInmueble,
        (estado: InmuebleState, { inmueble }) => {
            return {
                ...estado,
                ...inmueble,
                cargando: true,
                cargo: false,
            };
        },
    ),
    on(
        InmuebleActions.actualizarInmuebleExito,
        (estado: InmuebleState, { inmueble }) => {
            return {
                ...estado,
                ...inmueble,
                cargando: false,
                cargo: true,
                edito: true,
            };
        },
    ),
    on(
        InmuebleActions.actualizarInmuebleError,
        (estado: InmuebleState, { error }) => {
            return {
                ...estado,
                error,
                cargando: false,
                cargo: true,
                edito: true,
            };
        },
    ),
    // Deshabilitar
    on(
        InmuebleActions.deshabilitarInmueble,
        (estado: InmuebleState, { inmueble }) => {
            return {
                ...estado,
                ...inmueble,
                cargando: true,
                cargo: false,
            };
        },
    ),
    on(
        InmuebleActions.deshabilitarInmuebleExito,
        (estado: InmuebleState, { inmueble }) => {
            return {
                ...estado,
                ...inmueble,
                cargando: false,
                cargo: true,
            };
        },
    ),
    on(
        InmuebleActions.deshabilitarInmuebleError,
        (estado: InmuebleState, { error }) => {
            return {
                ...estado,
                error,
                cargando: false,
                cargo: false,
            };
        },
    ),

);


export function inmuebleReducer(state: InmuebleState | undefined, action: Action) {
    return _inmuebleReducer(state, action);
}

