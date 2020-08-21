import { Injectable } from '@angular/core';
import { PrincipalRestService } from 'src/lib/principal.service';
import { HttpClient } from '@angular/common/http';
import {PerfilUsuarioInterface} from '../../../../interfaces/perfil-usuario.interface';

@Injectable()
export class PerfilUsuarioRestService extends PrincipalRestService<PerfilUsuarioInterface>{
    constructor(
        private readonly _httpClient: HttpClient,
    ) {
        super(
            _httpClient,
            'perfil-usuario',
        );
    }
}
