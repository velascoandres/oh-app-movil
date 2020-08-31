import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {from, Observable, of} from 'rxjs';
import {map, reduce} from 'rxjs/operators';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class FileProviderService {
    constructor(
        private sanitizer: DomSanitizer) {
    }

    private manegarSeleccionImagenes(event: any, lista?: any): any {
        const archivos: any = Object.values(event.target.files);
        // return of(...archivos)
        //     .pipe(
        //         reduce(
        //             (acumulador: ObjetoArchivo[], archivo) => {
        //                 const reader = new FileReader();
        //                 if (archivo) {
        //                     reader.readAsDataURL(archivo);
        //                 }
        //                 reader.onloadend = () => {
        //                     console.log(typeof reader.result);
        //                     const cargoArchivo = typeof reader.result === 'string';
        //                     if (cargoArchivo) {
        //                         const nuevoArchivo: ObjetoArchivo = {
        //                             datos: reader.result,
        //                             nombreArchivo: archivo.name,
        //                             formato: archivo.type,
        //                         };
        //                         acumulador = [...acumulador, nuevoArchivo];
        //                     }
        //                 };
        //                 return acumulador;
        //             },
        //             [],
        //         )
        //     );
        // if (cargoArchivo) {
        //     const nuevoArchivo: ObjetoArchivo = {
        //         datos: reader.result,
        //         nombreArchivo: archivo.name,
        //         formato: archivo.type,
        //     };
        //     acumulador = [...acumulador, nuevoArchivo];
        // }
        return archivos.map(
            (archivo) => {
                return new Promise(
                    (resolve, _) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            const nuevoArchivo: ObjetoArchivo = {
                                datos: reader.result,
                                nombreArchivo: archivo.name,
                                formato: archivo.type,
                            };
                            resolve(nuevoArchivo);
                        };
                        reader.readAsDataURL(archivo);
                    }
                );
            }
        );
        // return archivos.map(
        //     (archivo) => {
        //         const reader = new FileReader();
        //         if (archivo) {
        //             reader.readAsDataURL(archivo);
        //         }
        //         return new Observable(
        //             (subs) => {
        //                 reader.onloadend = () => {
        //                     const cargoArchivo = typeof reader.result === 'string';
        //                     subs.next(reader.result);
        //                     subs.complete();
        //                 };
        //             }
        //         );
        //     }
        // );
        // return of(...archivos)
        //     .pipe(
        //         map(
        //             (archivo: File) => {
        //                 const reader = new FileReader();
        //                 if (archivo) {
        //                     reader.readAsDataURL(archivo);
        //                 }
        //                 return new Observable(
        //                     (subs) => {
        //                         reader.onloadend = () => {
        //                             const cargoArchivo = typeof reader.result === 'string';
        //                             subs.next(reader.result);
        //                             subs.complete();
        //                         };
        //                     }
        //                 );
        //             }
        //         ),
        //     );
    }


    leerArchivo(archivo): Promise<any> {
        return new Promise(
            (resolve, _) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const nuevoArchivo: ObjetoArchivo = {
                        datos: reader.result,
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
            indice ++;
        }
        return arreglo;
    }

    obtenerDatosArchivo(event) {
        return from(this.seleccionarImagen(event));
    }
}

export interface ObjetoArchivo {
    datos: any;
    nombreArchivo: string;
    formato: string;
}
