import { Injectable } from '@angular/core';
import { PrincipalRestService } from 'src/lib/principal.service';
import { HttpClient } from '@angular/common/http';
import {EntidadCoordenadaInterface} from '../../../../interfaces/entidad-coordenada.interface';

@Injectable()
export class EntidadCoordenadaRestService extends PrincipalRestService<EntidadCoordenadaInterface>{
    constructor(
        private readonly _httpClient: HttpClient,
    ) {
        super(
            _httpClient,
            'entidad-coordenada',
        );
    }
}
