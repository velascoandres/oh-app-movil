import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {InmuebleRestService} from '../../../../modulos/compartido/servicios/rest/inmueble-rest.service';
import {catchError, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {ApiResponse} from 'src/lib/principal.service';
import {InmuebleInterface} from 'src/app/interfaces/inmueble.interface';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppStateInmueble} from 'src/app/store/app.reducers';
import {InmuebleActions} from '../actions/inmueble.actions';
import {Router} from '@angular/router';

@Injectable()
export class InmuebleEffects {
    constructor(
        private acciones$: Actions,
        private readonly _inmuebleService: InmuebleRestService,
        private readonly inmuebleStore: Store<AppStateInmueble>,
        private readonly _router: Router,
    ) {

    }

    //                         this._router.navigate(['', 'tabs', 'gestion-inmueble']);
    cargarInmuebles$ = createEffect(
        () => {
            // Definimos que accion va escuchar
            return this.acciones$.pipe(
                ofType(InmuebleActions.cargarInmuebles),
                withLatestFrom(this.inmuebleStore.select('inmueble')),
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
                        return of(InmuebleActions.cargarInmueblesExito(
                            {
                                inmuebles: respuesta.data,
                                total: respuesta.total,
                                nextQuery: respuesta.nextQuery,
                            },
                        ));
                    }
                ),
                catchError(
                    error => of(InmuebleActions.cargarInmueblesError({error}))
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
                    ({inmueble, precio}) => {
                        return this._inmuebleService.crearInmueble(inmueble, precio);
                    },
                ),
                tap(
                    () => {
                        this._router.navigate(['', 'tabs', 'gestion-inmueble']);
                    },
                ),
                mergeMap(
                    (respuesta: InmuebleInterface) => {
                        console.log(respuesta);
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
    editarInmueble$ = createEffect(
        () => {
            // Definimos que accion va escuchar
            return this.acciones$.pipe(
                ofType(InmuebleActions.actualizarInmueble),
                mergeMap(
                    ({inmueble, precio}) => {
                        return this._inmuebleService.editarInmueble(inmueble, precio);
                    },
                ),
                mergeMap(
                    (respuesta: InmuebleInterface) => {
                        console.log(respuesta);
                        return of(InmuebleActions.actualizarInmuebleExito(
                            {
                                inmueble: respuesta,
                            },
                        ));
                    }
                ),
                catchError(
                    error => {
                        console.error(error);
                        return of(InmuebleActions.actualizarInmuebleError({error}));
                    }
                ),
            );
        },
    );
}
