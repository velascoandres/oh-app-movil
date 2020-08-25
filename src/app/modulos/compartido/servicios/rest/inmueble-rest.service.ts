import {Injectable} from '@angular/core';
import {PrincipalRestService} from 'src/lib/principal.service';
import {InmuebleInterface} from 'src/app/interfaces/inmueble.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class InmuebleRestService extends PrincipalRestService<InmuebleInterface> {
    constructor(
        private readonly _httpClient: HttpClient,
    ) {
        super(
            _httpClient,
            'inmueble',
        );
    }

    createOne(body: InmuebleInterface): Observable<InmuebleInterface> {
        const formData = new FormData();
        const imagenesRaw: File[] = body.imagenes.map(img => img.raw);
        // delete body.imagenes;
        const atributos = Object.keys(body);
        // armamos con los otros campos
        atributos.forEach(
            (atributo: keyof (InmuebleInterface)) => {
                if (atributo !== 'imagenes') {
                    formData.append(atributo, body[atributo]);
                }
            }
        );
        // armamos con las imagenes
        imagenesRaw.forEach(
            (imagenRaw: File) => {
                formData.append('imagenes[]', imagenRaw);
            }
        );
        return this._httpClient.post(this.url, formData) as Observable<InmuebleInterface>;
    }
}
