import { Injectable } from '@angular/core';
import { PrincipalRestService } from 'src/lib/principal.service';
import { InmuebleInterface } from 'src/app/interfaces/inmueble.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InmuebleRestService extends PrincipalRestService<InmuebleInterface>{
    constructor(
        private readonly _httpClient: HttpClient,
    ) {
        super(
            _httpClient,
            'inmueble',
        );
    }
}
