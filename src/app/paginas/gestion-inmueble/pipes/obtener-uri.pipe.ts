import {Pipe, PipeTransform} from '@angular/core';
import {ObjetoArchivo} from '../../../servicios/native/file-provider.service';

@Pipe({
    name: 'obtenerUri'
})
export class ObtenerUriPipe implements PipeTransform {

    transform(archivos: ObjetoArchivo[]): any[] {
        return archivos.map(archivo => ({url: archivo.datos}));
    }

}
