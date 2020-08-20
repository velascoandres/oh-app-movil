import { Injectable } from '@angular/core';
import { PrincipalRestService } from 'src/lib/principal.service';
import { HttpClient } from '@angular/common/http';
import { CategoriaInterface } from 'src/app/interfaces/categoria.interface';

@Injectable()
export class CategoriaRestService extends PrincipalRestService<CategoriaInterface>{
    constructor(
        private readonly _httpClient: HttpClient,
    ) {
        super(
            _httpClient,
            'categoria',
        );
    }
}
