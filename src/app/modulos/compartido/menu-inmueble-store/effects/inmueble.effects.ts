import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InmuebleRestService } from '../../servicios/rest/inmueble-rest.service';
import { InmueblesActions } from '../actions/menu-inmueble.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ApiResponse } from 'src/lib/principal.service';
import { InmuebleInterface } from 'src/app/interfaces/inmueble.interface';
import { of } from 'rxjs';

@Injectable()
export class InmuebleEffects {
    constructor(
        private acciones$: Actions,
        private readonly _inmuebleService: InmuebleRestService,
    ) {

    }

    cargarInmuebles$ = createEffect(
        () => {
            console.log('estoy aqui');
            // Definimos que accion va escuchar
            const accion$ = this.acciones$.pipe(
                ofType(InmueblesActions.cargarInmuebles)
            );
            return accion$
                .pipe(
                    mergeMap(
                        ({ parametros }) => {
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
}
