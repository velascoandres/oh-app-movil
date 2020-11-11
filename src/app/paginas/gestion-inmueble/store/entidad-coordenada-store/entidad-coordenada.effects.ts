import {EntidadCoordenadaRestService} from '../../../../modulos/compartido/servicios/rest/entidad-coordenada-rest.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ENTIDAD_COORD_ACCIONES} from './entidad-coordenada.actions';
import {of} from 'rxjs';
import {catchError, mergeMap, withLatestFrom} from 'rxjs/operators';
import {ApiResponse} from '../../../../../lib/principal.service';
import {EntidadCoordenadaInterface} from '../../../../interfaces/entidad-coordenada.interface';
import {Injectable} from '@angular/core';
import {MAPA_ACCIONES} from '../../../../modulos/mapa/store/mapa.actions';
import {AppStateEntidadCoordenada} from './entidad-coordenada.state';
import {Store} from '@ngrx/store';

@Injectable()
export class EntidadCoordenadaEffects {
    constructor(
        private readonly _entidadCoordenadaService: EntidadCoordenadaRestService,
        private readonly acciones$: Actions,
        private readonly entidadCoordStore: Store<AppStateEntidadCoordenada>,
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

    guardarCoordenasExito$ = createEffect(
        () => {
            return this.acciones$.pipe(
                ofType(ENTIDAD_COORD_ACCIONES.guardarCoordenada),
                mergeMap(
                    ({entidadCooordenada}) => {
                        return this._entidadCoordenadaService.createOne(entidadCooordenada);
                    }
                ),
                mergeMap(
                    (entidadCreada: EntidadCoordenadaInterface) => {
                        return of(
                            ENTIDAD_COORD_ACCIONES.guardarCoordenadaExito(
                                {entidadCooordenada: entidadCreada}
                            ),
                        );
                    }
                ),
                catchError(
                    (err => of(ENTIDAD_COORD_ACCIONES.errorOperacion({error: err}))),
                )
            );
        },
    );

    editarCoordenasExito$ = createEffect(
        () => {
            return this.acciones$.pipe(
                ofType(ENTIDAD_COORD_ACCIONES.editarCoordenada),
                withLatestFrom(this.entidadCoordStore.select('entidadCoordenada')),
                mergeMap(
                    ([{id, entidadCooordenada}, {entities}]) => {
                        const idEntidad = Object.keys(entities)[0];
                        console.log(idEntidad, entidadCooordenada);
                        return this._entidadCoordenadaService.updateOne(idEntidad, entidadCooordenada);
                    }
                ),
                mergeMap(
                    (entidadEditada: EntidadCoordenadaInterface) => {
                        return of(
                            ENTIDAD_COORD_ACCIONES.editarCoordenadaExito(
                                {id: entidadEditada.id, entidadCooordenada: entidadEditada}
                            ),
                        );
                    }
                ),
                catchError(
                    (err => of(ENTIDAD_COORD_ACCIONES.errorOperacion({error: err}))),
                )
            );
        },
    );
}
