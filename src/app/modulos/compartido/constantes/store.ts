import { StoreModule } from '@ngrx/store';
import { inmueblesReducer } from '../menu-inmueble-store/reducers/inmuebles.reducers';
import { inmueblesFavoritosReducer } from '../favoritos-store/favoritos.reducers';
import { inmuebleReducer } from '../menu-inmueble-store/reducers/inmueble.reducer';

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
    STORE_INMUEBLE,
    STORE_FAVORITO,
    STORE_INMUEBLE_UNICO,
];
