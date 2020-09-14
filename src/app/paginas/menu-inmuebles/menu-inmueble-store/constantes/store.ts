import {StoreModule} from '@ngrx/store';
import {inmueblesFavoritosReducer} from '../../../favoritos/favoritos-store/favoritos.reducers';
import {inmuebleReducer} from '../reducers/inmueble.reducer';
import {mapaReducer} from '../../../../store/mapa-store/mapa.reducers';

const STORE_FAVORITO = StoreModule.forFeature(
    'favoritos',
    inmueblesFavoritosReducer,
);

const STORE_INMUEBLE = StoreModule.forFeature(
    'inmueble',
    inmuebleReducer,
);

const STORE_MAPA = StoreModule.forFeature(
    'mapa',
    mapaReducer,
);

export const COMPARTIDO_STORE = [
    STORE_FAVORITO,
    STORE_INMUEBLE,
    STORE_MAPA,
];
