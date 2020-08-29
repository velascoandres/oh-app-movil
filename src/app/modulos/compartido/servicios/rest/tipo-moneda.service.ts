import {PrincipalRestService} from '../../../../../lib/principal.service';
import {TipoMonedaInterface} from '../../../../interfaces/tipo-moneda.interface';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class TipoMonedaService extends PrincipalRestService<TipoMonedaInterface> {
    constructor(
        private readonly _httpClient: HttpClient,
    ) {
        super(
            _httpClient,
            'tipo-moneda',
        );
    }
}
