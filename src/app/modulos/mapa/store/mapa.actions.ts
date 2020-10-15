import {createAction, props} from '@ngrx/store';
import {Coordenada, Poligono, Ruta} from './interfaces-tipos';

const dibujarPuntos = createAction(
    '[Mapa] Dibujar Puntos ',
    props<{
        puntos: Coordenada[],
    }>(),
);

const emitirInformacionGeografica = createAction(
    '[Mapa] Emitir informacion geografica',
);

const almacenarInformacion = createAction(
    '[Mapa] Almacenar informacion geografica',
    props<{
        puntos?: Coordenada[];
        rutas?: Ruta[];
        poligonos?: Poligono[];
    }>(),
);

const cargarModoLectura = createAction(
    '[Mapa] Cargar modo lectura',
);

const cargarModoEdicion = createAction(
    '[Mapa] Cargar modo edicion',
    props<{
        puntos?: Coordenada[];
        rutas?: Ruta[];
        poligonos?: Poligono[];
    }>(),
);

export const MapaAcciones = {
    dibujarPuntos,
    emitirInformacionGeografica,
    cargarModoLectura,
    cargarModoEdicion,
    almacenarInformacion,
};
