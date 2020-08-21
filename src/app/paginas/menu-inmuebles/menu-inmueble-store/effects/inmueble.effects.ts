import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InmuebleRestService } from '../../../../modulos/compartido/servicios/rest/inmueble-rest.service';
import { InmueblesActions } from '../actions/menu-inmueble.actions';
import { mergeMap, map, catchError, withLatestFrom, switchMap, concatMap } from 'rxjs/operators';
import { ApiResponse } from 'src/lib/principal.service';
import { InmuebleInterface } from 'src/app/interfaces/inmueble.interface';
import { of } from 'rxjs';
import { FavoritosActions } from '../../../favoritos/favoritos-store/favoritos.actions';
import { Store } from '@ngrx/store';
import { AppState, AppStateInmuebles } from 'src/app/store/app.reducers';

@Injectable()
export class InmuebleEffects {
    constructor(
        private acciones$: Actions,
        private readonly _inmuebleService: InmuebleRestService,
        private readonly inmublesStore: Store<AppStateInmuebles>,
    ) {

    }

    cargarInmuebles$ = createEffect(
        () => {
            // Definimos que accion va escuchar
            const accion$ = this.acciones$.pipe(
                ofType(InmueblesActions.cargarInmuebles),
                withLatestFrom(this.inmublesStore.select('inmuebles')),
                mergeMap(
                    ([{ parametros, filtro }, { queryActual }]) => {
                        console.log(parametros);
                        return this._inmuebleService.findAll(
                            {
                                ...queryActual,
                                ...parametros,
                            },
                        );
                    },
                ),
                mergeMap(
                    (respuesta: ApiResponse<InmuebleInterface>) => {
                        return of(InmueblesActions.cargarInmueblesExito(
                            {
                                inmuebles: respuesta.data,
                                total: respuesta.total,
                                nextQuery: respuesta.nextQuery,
                            },
                        ));
                    }
                ),
                catchError(
                    error => of(InmueblesActions.cargarInmueblesError({ error, }))
                ),
            );
            return accion$;
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
