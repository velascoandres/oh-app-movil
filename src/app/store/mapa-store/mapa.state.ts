import {Coordenada, Poligono, Ruta} from './interfaces-tipos';

export interface MapaState {
    estaVacio: boolean;
    modoEdicion?: boolean;
    puntos?: Coordenada[];
    rutas?: Ruta[];
    poligonos?: Poligono[];
    informacionSeleccionada?: {
        geografia: Coordenada | Ruta | Poligono;
        detalle: any;
    };
    error?: any;
}

