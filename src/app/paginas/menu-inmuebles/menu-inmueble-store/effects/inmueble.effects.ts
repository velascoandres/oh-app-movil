import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {InmuebleRestService} from '../../../../modulos/compartido/servicios/rest/inmueble-rest.service';
import {InmueblesActions} from '../actions/menu-inmueble.actions';
import {catchError, mergeMap, withLatestFrom} from 'rxjs/operators';
import {ApiResponse} from 'src/lib/principal.service';
import {InmuebleInterface} from 'src/app/interfaces/inmueble.interface';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppStateInmueble, AppStateInmuebles} from 'src/app/store/app.reducers';
import {InmuebleActions} from '../actions/inmueble.actions';

@Injectable()
export class InmuebleEffects {
    constructor(
        private acciones$: Actions,
        private readonly _inmuebleService: InmuebleRestService,
        private readonly inmublesStore: Store<AppStateInmuebles>,
        private readonly inmubleStore: Store<AppStateInmueble>,
    ) {

    }

    cargarInmuebles$ = createEffect(
        () => {
            // Definimos que accion va escuchar
            return this.acciones$.pipe(
                ofType(InmueblesActions.cargarInmuebles),
                withLatestFrom(this.inmublesStore.select('inmuebles')),
                mergeMap(
                    ([{parametros, filtro, sonDelUsuario}, {queryActual}]) => {
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

    crearInmueble$ = createEffect(
        () => {
            // Definimos que accion va escuchar
            return this.acciones$.pipe(
                ofType(InmuebleActions.crearInmueble),
                mergeMap(
                    ({inmueble}) => {
                        return this._inmuebleService.createOne(inmueble);
                    },
                ),
                mergeMap(
                    (respuesta: InmuebleInterface) => {
                        return of(InmuebleActions.crearInmuebleExito(
                            {
                                inmueble: respuesta,
                            },
                        ));
                    }
                ),
                catchError(
                    error => of(InmuebleActions.cargarInmuebleError({error}))
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
