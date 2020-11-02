import {EntidadCoordenadaRestService} from '../../../../modulos/compartido/servicios/rest/entidad-coordenada-rest.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ENTIDAD_COORD_ACCIONES} from './entidad-coordenada.actions';
import {of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {ApiResponse} from '../../../../../lib/principal.service';
import {EntidadCoordenadaInterface} from '../../../../interfaces/entidad-coordenada.interface';
import {Injectable} from '@angular/core';
import {MAPA_ACCIONES} from '../../../../modulos/mapa/store/mapa.actions';

@Injectable()
export class EntidadCoordenadaEffects {
    constructor(
        private readonly _entidadCoordenadaService: EntidadCoordenadaRestService,
        private readonly acciones$: Actions,
    ) {
    }

    cargarEntidadesCoordenada$ = createEffect(
        () => {
            return this.acciones$.pipe(
                ofType(ENTIDAD_COORD_ACCIONES.cargarCoordenada),
                mergeMap(
                    ({consulta}) => {
                        return this._entidadCoordenadaService.findAll(consulta);
                    }
                ),
                mergeMap(
                    (respuestaConsulta: ApiResponse<EntidadCoordenadaInterface>) => {
                        const entidades = respuestaConsulta.data;
                        return of(
                            ENTIDAD_COORD_ACCIONES.cargarCoordenadaExito(
                                {
                                    entidadesCoord: entidades,
                                }
                            ),
                        );
                    }
                ),
                catchError(
                    err => of(ENTIDAD_COORD_ACCIONES.errorOperacion(err)),
                )
            );
        }
    );

    cargarCoordenasExito$ = createEffect(
        () => {
            return this.acciones$.pipe(
                ofType(ENTIDAD_COORD_ACCIONES.cargarCoordenadaExito),
                mergeMap(
                    ({entidadesCoord}) => {
                        return of(MAPA_ACCIONES.dibujarPuntos(
                            {
                                puntos: [
                                    entidadesCoord[0].coordenadas,
                                ],
                            }
                        ));
                    }
                )
            );
        },
    );
}
