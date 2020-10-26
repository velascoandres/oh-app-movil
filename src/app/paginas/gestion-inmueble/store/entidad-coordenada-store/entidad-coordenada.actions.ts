import {createAction, props} from '@ngrx/store';
import {EntidadCoordenadaInterface} from '../../../../interfaces/entidad-coordenada.interface';

const cargarCoordenada = createAction(
    '[Entidad-Coordenada] Cargar Localizacion',
    props<{ consulta?: any }>(),
);
const guardarCoordenada = createAction(
    '[Entidad-Coordenada] Guardar Localizacion',
    props<{ entidadCooordenada: EntidadCoordenadaInterface }>(),
);

const editarCoordenada = createAction(
    '[Entidad-Coordenada] Editar Localizacion',
    props<{ entidadCooordenada: EntidadCoordenadaInterface; id: number; }>(),
);
const cargarCoordenadaExito = createAction(
    '[Entidad-Coordenada] Cargar Localizacion Exito',
    props<{ entidadesCoord: EntidadCoordenadaInterface[] }>(),
);
const guardarCoordenadaExito = createAction(
    '[Entidad-Coordenada] Guardar Localizacion Exito',
    props<{ entidadCooordenada: EntidadCoordenadaInterface }>(),
);

const editarCoordenadaExito = createAction(
    '[Entidad-Coordenada] Editar Localizacion Exito',
    props<{ entidadCooordenada: EntidadCoordenadaInterface; id: number; }>(),
);

const errorOperacion = createAction(
    '[Entidad-Coordenada] Error Operacion',
    props<{ error: any; }>(),
);

const limpiarEntidades = createAction(
    '[Entidad-Coordenada] Limpiar Entidades',
);


export const ENTIDAD_COORD_ACCIONES = {
    cargarCoordenada,
    guardarCoordenada,
    editarCoordenada,
    cargarCoordenadaExito,
    guardarCoordenadaExito,
    editarCoordenadaExito,
    errorOperacion,
    limpiarEntidades,
};
