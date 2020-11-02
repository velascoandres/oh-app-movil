import {Coordenada, Poligono, Ruta} from './interfaces-tipos';
import {Coordinate} from 'ol/coordinate';

export interface MapaState {
    estaVacio: boolean;
    modoEdicion?: boolean;
    puntos?: Coordinate[];
    rutas?: Ruta[];
    poligonos?: Poligono[];
    informacionSeleccionada?: {
        geografia: Coordenada | Ruta | Poligono;
        detalle: any;
    };
    error?: any;
}

