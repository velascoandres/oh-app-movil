import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {EntidadCoordenadaInterface} from '../../../../interfaces/entidad-coordenada.interface';


export const entidadCoordenadaAdapter: EntityAdapter<EntidadCoordenadaInterface> = createEntityAdapter<EntidadCoordenadaInterface>(
    {
        selectId: entidadCoord => entidadCoord.id,
    }
);
