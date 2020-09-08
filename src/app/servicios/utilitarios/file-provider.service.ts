import {Injectable} from '@angular/core';
import {from} from 'rxjs';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class FileProviderService {
    leerArchivo(archivo): Promise<any> {
        return new Promise(
            (resolve, _) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const nuevoArchivo: ObjetoArchivo = {
                        url: reader.result,
                        nombreArchivo: archivo.name,
                        formato: archivo.type,
                    };
                    resolve(nuevoArchivo);
                };
                reader.readAsDataURL(archivo);
            }
        );
    }

    async seleccionarImagen(event): Promise<any> {
        if (event.target && event.target.files) {
            const archivos: any = Object.values(event.target.files);
            const arreglo = [];
            let indice = 0;
            for (const archivo of archivos) {
                const datos = await this.leerArchivo(archivo);
                arreglo.push(
                    {
                        ...datos,
                        raw: event.target.files[indice],
                    }
                );
                indice++;
            }
            return arreglo;
        } else {
            return [];
        }

    }

    obtenerDatosArchivo(event) {
        return from(this.seleccionarImagen(event));
    }
}

export interface ObjetoArchivo {
    url: any;
    nombreArchivo?: string;
    formato?: string;
}
