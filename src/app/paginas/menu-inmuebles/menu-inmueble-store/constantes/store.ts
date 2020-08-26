import { StoreModule } from '@ngrx/store';
import { inmueblesReducer } from '../reducers/inmuebles.reducers';
import { inmueblesFavoritosReducer } from '../../../favoritos/favoritos-store/favoritos.reducers';
import { inmuebleReducer } from '../reducers/inmueble.reducer';

const STORE_INMUEBLE = StoreModule.forFeature(
    'inmuebles',
    inmueblesReducer,
);

const STORE_FAVORITO = StoreModule.forFeature(
    'favoritos',
    inmueblesFavoritosReducer,
);

const STORE_INMUEBLE_UNICO = StoreModule.forFeature(
    'inmueble',
    inmuebleReducer,
);

export const COMPARTIDO_STORE = [
    STORE_FAVORITO,
    STORE_INMUEBLE_UNICO,
];
