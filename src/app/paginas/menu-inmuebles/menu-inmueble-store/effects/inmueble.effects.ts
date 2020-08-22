import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {InmuebleRestService} from '../../../../modulos/compartido/servicios/rest/inmueble-rest.service';
import {InmueblesActions} from '../actions/menu-inmueble.actions';
import {catchError, mergeMap, withLatestFrom} from 'rxjs/operators';
import {ApiResponse} from 'src/lib/principal.service';
import {InmuebleInterface} from 'src/app/interfaces/inmueble.interface';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppStateInmuebles} from 'src/app/store/app.reducers';

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
            return this.acciones$.pipe(
                ofType(InmueblesActions.cargarInmuebles),
                withLatestFrom(this.inmublesStore.select('inmuebles')),
                mergeMap(
                    ([{parametros, filtro}, {queryActual}]) => {
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
                    error => of(InmueblesActions.cargarInmueblesError({error}))
                ),
            );
        },
    );

    // cargarInmueblesGestion$ = createEffect(
    //     () => {
    //         // Definimos que accion va escuchar
    //         return this.acciones$.pipe(
    //             ofType(GestionInmuebleActions.cargarInmueblesGestion),
    //             withLatestFrom(this.gestionInmueblesStore.select('gestionInmuebles')),
    //             mergeMap(
    //                 ([{parametros}, {query}]) => {
    //                     return this._inmuebleService.findAll(
    //                         {
    //                             ...query,
    //                             ...parametros,
    //                         },
    //                     );
    //                 },
    //             ),
    //             mergeMap(
    //                 (respuesta: ApiResponse<InmuebleInterface>) => {
    //                     return of(GestionInmuebleActions.cargarInmueblesGestionExito(
    //                         {
    //                             inmuebles: respuesta.data,
    //                             total: respuesta.total,
    //                             nextQuery: respuesta.nextQuery,
    //                         },
    //                     ));
    //                 }
    //             ),
    //             catchError(
    //                 error => of(GestionInmuebleActions.cargarInmueblesGestionError({error})),
    //             ),
    //         );
    //     },
    // );

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
