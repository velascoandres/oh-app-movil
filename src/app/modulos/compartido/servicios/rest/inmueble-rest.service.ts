import {Injectable} from '@angular/core';
import {PrincipalRestService} from 'src/lib/principal.service';
import {InmuebleInterface} from 'src/app/interfaces/inmueble.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PrecioInterface} from '../../../../interfaces/precio.interface';

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

    static establecerFormdataInmueble(body: InmuebleInterface, precio: PrecioInterface) {
        const formData = new FormData();
        body = {
            ...body,
            ...precio,
        };
        delete body.id;
        body.enAlquiler = body.enAlquiler ? 1 : 0;
        const imagenesRaw: File[] = body.imagenes ? body.imagenes.map(img => img.raw) : [];
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
        if (imagenesRaw.length) {
            imagenesRaw.forEach(
                (imagenRaw: File) => {
                    formData.append('imagenes[]', imagenRaw);
                }
            );
        }
        return formData;
    }

    crearInmueble(body: InmuebleInterface, precio: PrecioInterface): Observable<InmuebleInterface> {
        const formData = InmuebleRestService.establecerFormdataInmueble(body, precio);
        return this._httpClient.post(this.url + '/publicar-inmueble', formData) as Observable<InmuebleInterface>;
    }

    editarInmueble(body: InmuebleInterface, precio: PrecioInterface): Observable<InmuebleInterface> {
        const formData = InmuebleRestService.establecerFormdataInmueble(body, precio);
        return this._httpClient.put(`${this.url}/editar-publicacion-inmueble/${body.id}`, formData) as Observable<InmuebleInterface>;
    }
}
