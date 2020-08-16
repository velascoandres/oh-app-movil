import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InmuebleRestService } from '../../servicios/rest/inmueble-rest.service';
import { InmueblesActions } from '../actions/menu-inmueble.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ApiResponse } from 'src/lib/principal.service';
import { InmuebleInterface } from 'src/app/interfaces/inmueble.interface';
import { of } from 'rxjs';
import { FavoritosActions } from '../../favoritos-store/favoritos.actions';

@Injectable()
export class InmuebleEffects {
    constructor(
        private acciones$: Actions,
        private readonly _inmuebleService: InmuebleRestService,
    ) {

    }

    cargarInmuebles$ = createEffect(
        () => {
            // Definimos que accion va escuchar
            const accion$ = this.acciones$.pipe(
                ofType(InmueblesActions.cargarInmuebles)
            );
            return accion$
                .pipe(
                    mergeMap(
                        ({ parametros }) => {
                            console.log(parametros);
                            return this._inmuebleService.findAll(parametros);
                        },
                    ),
                    map(
                        (respuesta: ApiResponse<InmuebleInterface>) => {
                            return InmueblesActions.cargarInmueblesExito(
                                {
                                    inmuebles: respuesta.data,
                                    total: respuesta.total,
                                },
                            );
                        }
                    ),
                    catchError(
                        error => of(InmueblesActions.cargarInmueblesError({ error, }))
                    ),
                );
        },
    );

    // cargarInmueblesFavoritos$ = createEffect(
    //     () => {
    //         // Definimos que accion va escuchar
    //         const accion$ = this.acciones$.pipe(
    //             ofType(FavoritosActions.cargarInmueblesFavoritos)
    //         );
    //         return accion$
    //             .pipe(
    //                 mergeMap(
    //                     ({ parametros }) => {
    //                         return this._inmuebleService.findAll(parametros);
    //                     },
    //                 ),
    //                 map(
    //                     (respuesta: ApiResponse<InmuebleInterface>) => {
    //                         return FavoritosActions.cargarInmueblesFavoritosExito(
    //                             {
    //                                 inmuebles: respuesta.data,
    //                                 total: respuesta.total,
    //                             },
    //                         );
    //                     }
    //                 ),
    //                 catchError(
    //                     error => of(FavoritosActions.cargarInmueblesFavoritosError({ error, }))
    //                 ),
    //             );
    //     },
    // );
}
