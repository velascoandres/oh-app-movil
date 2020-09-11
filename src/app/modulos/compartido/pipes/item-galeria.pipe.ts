import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'itemGaleria'
})
export class ItemGaleriaPipe implements PipeTransform {

    transform(value: any[], ...args: unknown[]): unknown {
        return value.map(val => ({...val, seleccionado: false}));
    }

}
